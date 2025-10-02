const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');

const Transaction = require('../models/Transaction');

// --- Routes ---
// Note: All routes here are prefixed with '/api/transactions' (from server.js)
// and are protected by the 'protect' middleware.

/**
 * @desc    Get all transactions for the logged-in user
 * @route   GET /api/transactions
 * @access  Private
 */
router.get('/', protect, asyncHandler(async (req, res) => {
  // req.user is available because of the 'protect' middleware
  const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
  res.status(200).json(transactions);
}));

/**
 * @desc    Add a new transaction
 * @route   POST /api/transactions
 * @access  Private
 */
router.post('/', protect, asyncHandler(async (req, res) => {
  const { description, amount, type, category, date } = req.body;

  // Basic validation
  if (!description || !amount || !type) {
    res.status(400);
    throw new Error('Please provide description, amount, and type');
  }

  const transaction = await Transaction.create({
    user: req.user.id, // Link the transaction to the logged-in user
    description,
    amount,
    type,
    category,
    date: date || Date.now(),
  });

  res.status(201).json(transaction);
}));

/**
 * @desc    Update a transaction
 * @route   PUT /api/transactions/:id
 * @access  Private
 */
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Check if the transaction belongs to the logged-in user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401); // Unauthorized
    throw new Error('User not authorized to update this transaction');
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the modified document rather than the original
  });

  res.status(200).json(updatedTransaction);
}));

/**
 * @desc    Delete a transaction
 * @route   DELETE /api/transactions/:id
 * @access  Private
 */
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Check if the transaction belongs to the logged-in user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401); // Unauthorized
    throw new Error('User not authorized to delete this transaction');
  }

  await transaction.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Transaction removed' });
}));

module.exports = router;
