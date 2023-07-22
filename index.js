
const express = require("express");
const app = express()
const cors = require("cors")
require('dotenv').config();
const Port = process.env.port
const Razorpay = require('razorpay');
const connection = require("./db");
const userRouter = require("./routes/userRouter");
const donationRouter = require("./routes/donationRoute");
const adminRouter = require("./routes/admin/adminRoute");
const userDetailsRoute = require("./routes/admin/userDetailsRoute");
const organizationRouter = require("./routes/organizationRoute");
const paymentRouter = require("./routes/paymentRoute");
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/donation', donationRouter);
app.use('/admin', adminRouter)
app.use('/admin/userDetails', userDetailsRoute)
app.use('/organization', organizationRouter);
app.use('/payment', paymentRouter);


app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

const instance = new Razorpay({
  key_id: process.env.razorPayKey,
  key_secret: process.env.razorPaySecret
})

app.listen(Port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is listening on port ${Port}`);
});

module.exports = instance;
