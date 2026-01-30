const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBURL = process.env.MONGO_URI;

const connectDB = async () => {
    await mongoose.connect(mongoDBURL);
}

module.exports = connectDB;


