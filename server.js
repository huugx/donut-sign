const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const dotenv = require("dotenv")


const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.header( 'Access-Control-Allow-Origin', process.env.CORS_ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();  
});

app.get('/', (req, res) => {
    res.send("Server running")
})

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

app.post("/api/save", function(req,res) {
    const data = req.body; 
    console.log('Body: ', data);
    const query = {'address': req.body.address};


    User.findOneAndUpdate(query, data, {upsert: true, new: true}, function(error, doc) {
        if (error) {
            return res.send(500, {error: err});
        } 
        return res.send('Succesfully saved.');        
    });
})


//connect to mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wjrzi.mongodb.net/ethtrader`)

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

app.listen(PORT, console.log(`express server is running on port ${PORT}`));