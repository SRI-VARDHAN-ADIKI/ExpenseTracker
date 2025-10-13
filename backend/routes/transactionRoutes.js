const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware.js');

const Transaction = require('../models/Transaction.js');

// GET all transactions.
router.get('/', protect, asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
}));

// POST a new transaction
router.post('/', protect, asyncHandler(async (req, res) => {
    const { description, amount, type, category } = req.body;
    if (!description || !amount || !type || !category) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const transaction = new Transaction({ user: req.user.id, description, amount, type, category });
    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
}));

// === NEW UPDATE ROUTE START ===
// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
router.put('/:id', protect, asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // Check for user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // This option returns the modified document
    });

    res.json(updatedTransaction);
}));
// === NEW UPDATE ROUTE END ===

// DELETE a transaction
router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await transaction.deleteOne();
    res.status(200).json({ id: req.params.id });
}));

module.exports = router;
