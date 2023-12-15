// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ChannelModel = require("./models/channel")
require('dotenv').config({ path: '../.env' })

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// console.log(process.env.MONGODB_URI);
// MongoDB connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log(`MongoDB connection SUCCESS: ${conn}`);
    } catch (error) {
        console.error(`MongoDB connection FAIL: ${error.message}`);
        process.exit(1);
    }
}
connectDB();

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


/* Start of Insert into Database*/
const router = express.Router()

app.get("/insert",(req,res)=>{
    // to insert, we will be needing a model
    var channelModel = new ChannelModel()
    channelModel.name = "xyz"
    channelModel.type = "Tech"
    channelModel.save()
    .then((data) => {
        res.status(200).send({ "msg": "inserted to db" });
    })
    .catch((err) => {
        console.error(err);
    });

})

/* End of Insert into database*/

/* Start of Read into DATABASE*/
app.get("/read", (req, res) => {
    ChannelModel.find().exec()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

/* End of Read into DATABASE*/

/* Start of Update into Database*/
app.get("/update", (req, res) => {
    const { id, name } = req.query;
    
    // Use findByIdAndUpdate with the new promise syntax
    ChannelModel.findByIdAndUpdate(id, { name })
        .exec()
        .then(updatedDocument => {
            if (!updatedDocument) {
                return res.status(404).send({ error: 'Document not found' });
            }
            res.status(200).send(updatedDocument);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

/* End of Update into database*/

/* Start of Delete from Database */
app.get("/delete", (req, res) => {
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
/* End of Delete from Database */



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
