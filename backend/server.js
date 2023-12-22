const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ChannelModel = require('./models/channel');
const { resolve } = require('path');
require('dotenv').config({ path: '../.env' });

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
app.use(express.static('../../client/html'));

// MongoDB routes
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
app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.get('/config', async (req, res) => {
  const price = 2000;
  console.log('₹', price);
  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  console.log(sessionId);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;
  console.log(req.body);
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
  // Stripe webhook handler logic
  // ...
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function checkEnv() {
  const price = 2000;
  if (price === 'price_12345' || !price) {
    console.log(
      'You must set a Price ID in the environment variables. Please see the README.'
    );
    process.exit(0);
  }
}
