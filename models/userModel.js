const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({
    username: String,
    address: String,
    chain: String
},{
    collection: 'users'
});

const User = mongoose.model("users", userSchema);

module.exports = User;