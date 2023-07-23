const express = require('express');
const auth = require('../middlewares/authMiddleware');
const DonatedDataModel = require('../models/donatedDataModel');
const donatedDataRouter = express.Router();

donatedDataRouter.post('/', auth, async(req, res) => {
    const userId = req.body.userId;
    try {
        const donatedData = await DonatedDataModel.findOne({userId});
        res.status(200).send(donatedData);
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})

donatedDataRouter.post('/addData', auth, async(req, res) => {
    try {
        const donatedData = await DonatedDataModel.create(req.body);
        res.status(200).send(donatedData);
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})

module.exports = donatedDataRouter;