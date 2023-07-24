const express = require('express');
const paymentController = require("../middlewares/payment.controller");
const auth = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt');
const PaymentModel = require('../models/paymentModel');
const paymentRouter = express.Router();

paymentRouter.post('/pay', auth, async(req, res) => {
    const {expiry, cvv, cardNumber} = req.body;
    try {
        const newExp = await bcrypt.hash(expiry, 10);
        const newCvv = await bcrypt.hash(cvv, 10);

        const payment = await PaymentModel.create({...req.body, expiry : newExp, cvv :newCvv});
        res.status(200).send({'msg' : 'Payment Successful!', 'msg2' : 'Thank you for contribution🫶', payment});
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})


module.exports = paymentRouter;