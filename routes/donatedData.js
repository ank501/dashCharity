const express = require('express');
const auth = require('../middlewares/authMiddleware');
const DonatedDataModel = require('../models/donatedDataModel');
const donatedDataRouter = express.Router();

donatedDataRouter.get('/', auth, async(req, res) => {
    try {
        const donatedData = await DonatedDataModel.findOne();
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

donatedDataRouter.patch('/update/:id', auth, async(req, res) => {
    const id = req.params.id;
    try {
        const donatedData = await DonatedDataModel.findByIdAndUpdate({_id : id}, req.body, {new : true});
        res.status(200).send({'msg' : 'Data updated', donatedData});
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})

module.exports = donatedDataRouter;