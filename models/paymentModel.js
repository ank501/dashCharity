const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'donatedData',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
