const mongoose = require("mongoose")

//creating schema
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
})

// exporting it to channel
const ChannelModel = mongoose.model("Channel", channelSchema)
module.exports = ChannelModel
