const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// POST route to create a new notification
router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
  } catch (error) {
    res.status(400).json({ error: 'Error creating notification' });
  }
});

// GET route to fetch all notifications for a specific user
router.get('/user/:user_id', async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.params.user_id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
});

// GET route to fetch a single notification by its ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notification' });
  }
});

// PUT route to update a notification by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification updated successfully', notification: updatedNotification });
  } catch (error) {
    res.status(400).json({ error: 'Error updating notification' });
  }
});

module.exports = router;
