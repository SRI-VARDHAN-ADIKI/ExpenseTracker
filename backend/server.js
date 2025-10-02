// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

// Import route files
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

// --- Database Connection ---
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error)
  {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// --- Express App Initialization ---
const app = express();

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in the request body

// --- API Routes ---
// Any request to /api/auth will be handled by authRoutes
app.use('/api/auth', authRoutes);

// A simple test route to ensure the server is working
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

// --- Server Listening ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

