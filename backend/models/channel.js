const mongoose = require("mongoose");

// Creating schema
const channelSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   type: {
      type: String,
      required: true,
      trim: true,
   },
   price: {
      type: Number,
      required: true,
   },
   backgroundColor: {
      type: String,
      trim: true,
   },
   image: {
      type: String,
      trim: true,
   },
});

// Exporting it as ChannelModel
const ChannelModel = mongoose.model("Channel", channelSchema);
module.exports = ChannelModel;
