const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const ChannelModel = require("./models/channel");
const { resolve } = require("path");
require("dotenv").config({ path: "../.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    name: "stripe-samples/checkout-one-time-payments",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-one-time-payments",
  },
});

const app = express();
if (process.env.NODE_ENV == "production") {
  app.use(express.static("../../client/build"));
}

const PORT = process.env.PORT || 5000;
app.use(express.static("../../client/html"));
app.get("/insert", async (req, res) => {
  const items = [
    {
      name: "BLUE",
      type: "Sky",
      price: 19.99,
      backgroundColor: "red",
      image: "https://picsum.photos/250/250?random=1",
    },
    {
      name: "GREEN",
      type: "Grass",
      price: 24.99,
      backgroundColor: "blue",
      image: "https://picsum.photos/250/250?random=2",
    },
    {
      name: "RED",
      type: "Apple",
      price: 14.99,
      backgroundColor: "red",
      image: "https://picsum.photos/250/250?random=3",
    },
    {
      name: "YELLOW",
      type: "Banana",
      price: 29.99,
      backgroundColor: "yellow",
      image: "https://picsum.photos/250/250?random=4",
    },
    {
      name: "PURPLE",
      type: "Grapes",
      price: 19.99,
      backgroundColor: "purple",
      image: "https://picsum.photos/250/250?random=5",
    },
    {
      name: "ORANGE",
      type: "Carrot",
      price: 24.99,
      backgroundColor: "orange",
      image: "https://picsum.photos/250/250?random=6",
    },
    {
      name: "PINK",
      type: "Flower",
      price: 14.99,
      backgroundColor: "pink",
      image: "https://picsum.photos/250/250?random=7",
    },
    {
      name: "BROWN",
      type: "Tree",
      price: 29.99,
      backgroundColor: "brown",
      image: "https://picsum.photos/250/250?random=8",
    },
    {
      name: "BLACK",
      type: "Cat",
      price: 19.99,
      backgroundColor: "black",
      image: "https://picsum.photos/250/250?random=9",
    },
  ];

  try {
    const result = await ChannelModel.insertMany(items);
    res.status(200).send({ msg: "Items inserted to db", result });
  } catch (error) {
    console.error("Error inserting items to db:", error);
    res.status(500).send({ error: "Error inserting items to db" });
  }
});

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
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Serve static files
app.use(express.static("../../client/html"));

// MongoDB routes
app.get("/insert", (req, res) => {
  var channelModel = new ChannelModel();
  channelModel.name = "xyz";
  channelModel.type = "Tech";
  channelModel.price = 19.99; // Add price to the model based on your structure
  channelModel
    .save()
    .then((data) => {
      res.status(200).send({ msg: "inserted to db" });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const { items } = req.body;

  try {
    // Fetch item details from MongoDB based on item IDs
    const itemsFromDB = await ChannelModel.find({
      _id: { $in: items.map((item) => item.id) },
    });

    // Create line items for the Stripe session
    const lineItems = itemsFromDB.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: items.find((cartItem) => cartItem.id === item._id.toString())
        .quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled`,
    });

    return res.redirect(303, session.url);
  } catch (error) {
    console.error("Error fetching item details:", error);
    return res.status(500).send({ error: "Error fetching item details" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function checkEnv() {
  const price = 2000;
  if (price === "price_12345" || !price) {
    console.log(
      "You must set a Price ID in the environment variables. Please see the README."
    );
    process.exit(0);
  }
}
