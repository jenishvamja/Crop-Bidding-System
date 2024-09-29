const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');

// POST route to place a new bid
router.post('/', async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
  } catch (error) {
    res.status(400).json({ error: 'Error placing bid' });
  }
});

// GET route to fetch all bids for a specific crop
router.get('/crop/:crop_id', async (req, res) => {
  try {
    const bids = await Bid.find({ crop_id: req.params.crop_id });
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bids' });
  }
});

// GET route to fetch all bids by a specific bidder
router.get('/bidder/:bidder_id', async (req, res) => {
  try {
    const bids = await Bid.find({ bidder_id: req.params.bidder_id });
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bids' });
  }
});

module.exports = router;
