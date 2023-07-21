const express = require('express');
const PaymentModel = require('../models/paymentModel');
const paymentRouter = express.Router();

paymentRouter.post('/', async(req, res) => {
    const {user, donation, amount, status} = req.body;
    try {
        const newDetails = {user, donation, amount, status : 'completed'}
        const payment = await PaymentModel.create(newDetails);
        res.status(200).send({'msg' : 'Payment Successful', payment});
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})

module.exports = paymentRouter;