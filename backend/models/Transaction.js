// backend/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  total: { type: Number, required: true },
  // Add other fields as needed
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;