const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST route to create a new transaction
router.post('/', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    res.status(400).json({ error: 'Error creating transaction' });
  }
});

// GET route to fetch all transactions for a specific buyer
router.get('/buyer/:buyer_id', async (req, res) => {
  try {
    const transactions = await Transaction.find({ buyer_id: req.params.buyer_id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

// GET route to fetch all transactions for a specific seller
router.get('/seller/:seller_id', async (req, res) => {
  try {
    const transactions = await Transaction.find({ seller_id: req.params.seller_id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

module.exports = router;
