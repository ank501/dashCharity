const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  cardName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: Number,
    required: true
  },
  expiry: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  }
});

const PaymentModel = mongoose.model('payment', paymentSchema);

module.exports = PaymentModel;
