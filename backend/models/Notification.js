const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  _id: { type: String, required: true }, // unique_notification_id
  user_id: { type: String, required: true, ref: 'User' }, // Refers to the user who will receive the notification
  message: { type: String, required: true }, // Content of the notification
  read: { type: Boolean, default: false }, // Indicates if the notification has been read
  created_at: { type: Date, default: Date.now } // Date when the notification was created
});

// Create and export the Notification model
module.exports = mongoose.model('Notification', notificationSchema);
