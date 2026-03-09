require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if (conn) {
            console.log('MongoDB connected');
        } else {
            console.error('Error connecting to MongoDB');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        
    }
};

module.exports = connectDB;