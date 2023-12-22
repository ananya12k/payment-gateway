const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const ChannelModel = require('./models/channel');
const { resolve } = require('path');
require('dotenv').config({ path: '../..env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'stripe-samples/checkout-one-time-payments',
    version: '0.0.1',
    url: 'https://github.com/stripe-samples/checkout-one-time-payments',
  },
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connection SUCCESS: ${conn}`);
  } catch (error) {
    console.error(`MongoDB connection FAIL: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Serve static files
app.use(express.static(process.env.STATIC_DIR));

// Insert into Database
app.get('/insert', (req, res) => {
  var channelModel = new ChannelModel();
  channelModel.name = 'xyz';
  channelModel.type = 'Tech';
  channelModel
    .save()
    .then((data) => {
      res.status(200).send({ msg: 'inserted to db' });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Read from DATABASE
app.get('/read', (req, res) => {
  ChannelModel.find()
    .exec()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

// Update in Database
app.get('/update', (req, res) => {
  const { id, name } = req.query;

  ChannelModel.findByIdAndUpdate(id, { name })
    .exec()
    .then((updatedDocument) => {
      if (!updatedDocument) {
        return res.status(404).send({ error: 'Document not found' });
      }
      res.status(200).send(updatedDocument);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete from Database
app.get('/delete', (req, res) => {
  const { id } = req.query;

  ChannelModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: 'Document not found' });
      }
      res.status(200).send({ msg: 'Document deleted successfully' });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Stripe routes
app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded());
app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.get('/config', async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE);
  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  });
});

app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { quantity } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: quantity,
      },
    ],
    mode: 'payment',
    success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled`,
  });

  return res.redirect(303, session.url);
});

app.post('/webhook', async (req, res) => {
  let data;
  let eventType;

  if (process.env.STRIPE_WEBHOOK_SECRET) {
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.');
      return res.sendStatus(400);
    }

    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    console.log('🔔  Payment received!');
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
