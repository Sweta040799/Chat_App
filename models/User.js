const mongoose = require('mongoose');

//Define User Schema
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

//Create User model
const User = mongoose.model('User', userSchema);
module.exports = User;

