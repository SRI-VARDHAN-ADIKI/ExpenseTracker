const mongoose = require('mongoose');

// Define the schema for the Transaction model
const transactionSchema = new mongoose.Schema({
  // Link the transaction to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to our User model
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add a description'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'], // The type must be either 'income' or 'expense'
    required: [true, 'Please specify the type (income/expense)'],
  },
  category: {
    type: String,
    trim: true,
    required: [true, 'Please add a category (e.g., Food, Salary)'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  // Add timestamps for record creation and updates
  timestamps: true,
});

// Create the Transaction model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
