const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

mongoose.connect(`mongodb+srv://yash:${process.env.MONGO_PASSWORD}@cluster0.8ld7o8r.mongodb.net/?retryWrites=true&w=majority`)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

