const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://amirali531361:amirali531361@cluster0.t3adoy2.mongodb.net/devVibe");
}

module.exports = connectDB;


