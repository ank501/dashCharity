const Razorpay = require('razorpay');
require('dotenv').config();

const orders = (req, res) => {
    let instance = new Razorpay({ key_id: process.env.razorPayKey, key_secret: process.env.razorPaySecret });

    let options = {
        amount: req.body.amount*100, 
        currency: "INR"
    };
    instance.orders.create(options, function (err, order) {
        if(err){
            return res.status(500).send({'msg' : 'Server Error'});
        }

        return res.status(200).send({'msg' : 'Order created', data : order});
    });
}

const verify = () => {
    res.send({ verify });
}

module.exports = { orders, verify };