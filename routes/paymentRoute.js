const express = require('express');
const PaymentModel = require('../models/paymentModel');
const {checkout} = require('../middlewares/payment.controller');
const paymentRouter = express.Router();

// paymentRouter.post('/', async(req, res) => {
//     const {user, donation, amount, status} = req.body;
//     try {
//         const newDetails = {user, donation, amount, status : 'completed'}
//         const payment = await PaymentModel.create(newDetails);
//         res.status(200).send({'msg' : 'Payment Successful', payment});
//     } catch (error) {
//         res.status(400).send({'msg' : error.message});
//     }
// })

paymentRouter.route('/checkout', checkout);

module.exports = paymentRouter;