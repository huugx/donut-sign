const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const dotenv = require("dotenv")


const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use("/", require("./routes/api"))

app.get("/api", function(req,res) {
    User.find({ })
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
})

app.get('/api/user', function(req,res) {
    const address = new RegExp(`^${req.query.address}$`, 'i');
    User.find({address})
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
})


//connect to mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wjrzi.mongodb.net/ethtrader`)

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

app.listen(PORT, console.log(`express server is running on port ${PORT}`));