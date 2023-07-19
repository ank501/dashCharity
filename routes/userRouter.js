const express = require('express');
const validator = require('../middlewares/validator');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const BlackListModel = require('../models/blacklistModel');
const UserBlackList = require('../models/adminModels/userBlackList');
const userRouter = express.Router();

userRouter.post('/register', validator, async (req, res) => {
    const { password } = req.body;
    try {
        const newPass = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ ...req.body, password: newPass });
        res.status(200).send({ 'msg': 'User registered successfully', user })
    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        const blacklistedUser = await UserBlackList.findOne({email});
        if(blacklistedUser){
            return res.status(400).send({'msg' : 'You are not allowed to login.'})
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).send({ 'msg': 'User not found' });
        }
        else {
            const comparePass = await bcrypt.compare(password, user.password);
            if (!comparePass) {
                res.status(400).send({ 'msg': 'Wrong password' });
            }
            else {
                const token = jwt.sign({ userId: user._id, name: user.name }, process.env.secretKey, { expiresIn: '7h' });
                res.status(200).send({ 'msg': 'User logged in successfully', token });
            }
        }
    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})

userRouter.get('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) {
            res.status(400).send({ 'msg': 'Invalid token' });
        }
        else {
            const blacklistedUser = await BlackListModel.findOne({ token });
            if (blacklistedUser) {
                res.status(400).send({ 'msg': 'Login again' });
            }
            else {
                const blacklist = await BlackListModel.create({token});
                res.status(200).send({ 'msg': 'User logged out successfully' });
            }
        }
    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})

module.exports = userRouter;