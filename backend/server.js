const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {

    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};


connectDB();


const app = express();


const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});