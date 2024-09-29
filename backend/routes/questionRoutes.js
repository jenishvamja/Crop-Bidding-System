const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// POST route to create a new question
router.post('/', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    res.status(400).json({ error: 'Error creating question' });
  }
});

// GET route to fetch all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

// GET route to fetch a single question by its ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching question' });
  }
});

// PUT route to update a question by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    res.status(400).json({ error: 'Error updating question' });
  }
});

module.exports = router;
