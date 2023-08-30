const express = require('express');
const auth = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt');
const PaymentModel = require('../models/paymentModel');
const Razorpay = require('razorpay');
const paymentRouter = express.Router();
const crypto = require('crypto');

// Payment Request

paymentRouter.post('/orders', auth, async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.razorPayKey,
            key_secret: process.env.razorPaySecret
        })

        const options = {
            amount: req.body.amount * 100,
            currency: "USD",
            receipt: crypto.randomBytes(10).toString("hex")
        }

        instance.orders.create(options, (error, order) => {
            if (error) {
                res.status(400).send({ msg: 'Something went wrong!' })
            }
            else {
                res.status(200).send({ data: order });
            }
        })
    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})

// Payment verification

paymentRouter.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = `${razorpay_order_id} | ${razorpay_payment_id}`;
        const userSign = crypto.createHmac('sha256', process.env.razorPaySecret).update(sign.toString()).digest('hex');

        if (razorpay_signature === userSign) {
            return res.status(200).send({ msg: 'Payment Successful' });
        }
        res.status(400).send({ msg: 'Invalid credentials!' })

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

module.exports = paymentRouter;





// paymentRouter.post('/pay', auth, async(req, res) => {
//     const {expiry, cvv, cardNumber} = req.body;
//     try {
//         const newExp = await bcrypt.hash(expiry, 10);
//         const newCvv = await bcrypt.hash(cvv, 10);

//         const payment = await PaymentModel.create({...req.body, expiry : newExp, cvv :newCvv});
//         res.status(200).send({'msg' : 'Payment Successful!', 'msg2' : 'Thank you for contribution🫶', payment});
//     } catch (error) {
//         res.status(400).send({'msg' : error.message});
//     }
// })