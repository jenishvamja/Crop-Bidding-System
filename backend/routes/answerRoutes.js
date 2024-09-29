const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

// POST route to create a new answer
router.post('/', async (req, res) => {
  try {
    const newAnswer = new Answer(req.body);
    await newAnswer.save();
    res.status(201).json({ message: 'Answer created successfully', answer: newAnswer });
  } catch (error) {
    res.status(400).json({ error: 'Error creating answer' });
  }
});

// GET route to fetch all answers for a specific question
router.get('/question/:question_id', async (req, res) => {
  try {
    const answers = await Answer.find({ question_id: req.params.question_id });
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching answers' });
  }
});

// GET route to fetch a single answer by its ID
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching answer' });
  }
});

// PUT route to update an answer by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnswer) {
      return res.status(404).json({ error: 'Answer not found' });
    }
    res.status(200).json({ message: 'Answer updated successfully', answer: updatedAnswer });
  } catch (error) {
    res.status(400).json({ error: 'Error updating answer' });
  }
});

module.exports = router;
