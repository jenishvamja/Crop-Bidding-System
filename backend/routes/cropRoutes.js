// routes/cropRoutes.js
const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// POST route to create a new crop listing
router.post('/crop', async (req, res) => {
  try {
    const newCrop = new Crop(req.body);
    await newCrop.save();
    res.status(201).json({ message: 'Crop listed successfully', crop: newCrop });
  } catch (error) {
    res.status(400).json({ error: 'Error creating crop listing' });
  }
});

// GET route to fetch all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching crops' });
  }
});

// GET route to fetch a specific crop by ID
router.get('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.status(200).json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching crop' });
  }
});

// PUT route to update a crop by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCrop) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.status(200).json({ message: 'Crop updated successfully', crop: updatedCrop });
  } catch (error) {
    res.status(400).json({ error: 'Error updating crop' });
  }
});

// DELETE route to delete a crop by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCrop = await Crop.findByIdAndDelete(req.params.id);
    if (!deletedCrop) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.status(200).json({ message: 'Crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting crop' });
  }
});

module.exports = router;
