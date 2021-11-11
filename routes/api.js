const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.route("/api/save").post((req,res) => {
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

module.exports = router;