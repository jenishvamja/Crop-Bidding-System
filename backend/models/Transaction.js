const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  _id: { type: String, required: true }, // unique_transaction_id
  crop_id: { type: String, required: true, ref: 'Crop' }, // Refers to the crop being transacted
  buyer_id: { type: String, required: true, ref: 'User' }, // Refers to the buyer
  seller_id: { type: String, required: true, ref: 'User' }, // Refers to the seller (farmer)
  final_price: { type: Number, required: true }, // Final price agreed upon in the transaction
  quantity: { type: Number, required: true }, // Quantity of crop transacted
  transaction_date: { type: Date, default: Date.now }, // Date of transaction
  payment_method: { type: String, required: true }, // Payment method (e.g., Credit Card, UPI)
  payment_status: { type: String, required: true }, // Payment status (e.g., Completed, Pending)
});

// Create and export the Transaction model
module.exports = mongoose.model('Transaction', transactionSchema);
