const express = require('express');
const validator = require('../middlewares/validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Organization = require('../models/organizationModel');
const organizationRouter = express.Router();

organizationRouter.get('/', async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    const pageNum = +page || 1;
    const pageLimit = +limit || 5;
    const skip = (pageNum - 1) * pageLimit;
    try {
        const org = await Organization.find(req.query).skip(skip).limit(limit);
        res.status(200).send(org);
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
})



module.exports = organizationRouter;