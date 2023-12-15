require("dotenv").config();

const express = require("express")
const app = express()

app.use(express.json())

const stripe= require("stripe")(process.env.STRIPE_SECRET_KEY);
const storeItems = new Map([[1,{pricecents:1000,name:"Learn now"}],[2,{pricecents:2000,name:"Learn later"}]]);
app.listen(3000);
