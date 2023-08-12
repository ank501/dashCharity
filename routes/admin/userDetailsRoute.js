const express = require("express");
const UserModel = require("../../models/userModel");
const UserBlackList = require("../../models/adminModels/userBlackList");
const DonationModel = require("../../models/donationModel");
const AdminModel = require("../../models/adminModels/adminModel");
const Organization = require("../../models/organizationModel");
const adminauthMiddleware = require("../../middlewares/adminauthMiddleware");
const userDetailsRoute = express.Router();

userDetailsRoute.get("/", async (req, res) => {
  const { q } = req.query;
  const page = req.query.page;
  const limit = req.query.limit;
  try {
    const pageNum = +page || 1;
    const pageLimit = +limit;
    const skip = (pageNum - 1) * pageLimit;

    const totalUsers = await DonationModel.find()
    
 
    if (q) {
      const allusers = await DonationModel.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(skip)
        .limit(pageLimit);
      res.status(200).send({...allusers,totalUsers:totalUsers.length,totalUsersData:totalUsers});
    } else {
      const allusers = await DonationModel.find().skip(skip).limit(pageLimit);
      res.status(200).send({data:allusers,totalUsers:totalUsers.length,totalUsersData:totalUsers});
    }
  } catch (error) {
    res.status(400).send({ errmsg: error.message });
  }
});


userDetailsRoute.get("/getallusers", async (req, res) => {
  const { q } = req.query;
  // const page = req.query.page;
  // const limit = req.query.limit;
  try {
   

    if (q) {
      const allusers = await UserModel.find({
        name: { $regex: q, $options: "i" },
      })
        .skip(skip)
        .limit(pageLimit);
      res.status(200).send(allusers);
    } else {
      const allusers = await UserModel.find()
      res.status(200).send(allusers);
    }
  } catch (error) {
    res.status(400).send({ errmsg: error.message });
  }
});



userDetailsRoute.get("/adminusers", async (req, res) => {
  const { q } = req.query;
 
  try {
   

    if (q) {
      const allusers = await AdminModel.find({
        name: { $regex: q, $options: "i" },
      })
       
      res.status(200).send(allusers);
    } else {
      const allusers = await AdminModel.find()
      res.status(200).send(allusers);
    }
  } catch (error) {
    res.status(400).send({ errmsg: error.message });
  }
});

userDetailsRoute.post("/blockuser", async (req, res) => {

  try {
   const blockuser = await UserBlackList.create(req.body)
   res.status(200).send({"msg":"User is Blocked",blockuser})
  } catch (error) {
    res.status(400).send({ errmsg: error.message });
  }
});

userDetailsRoute.delete("/unblockuser/:id", async (req, res) => {
  const {id} = req.params.id
   try {
    const unblockuser = await UserBlackList.findByIdAndDelete({_id:id})
    res.status(200).send({"msg":"User is unBlocked",unblockuser})
   } catch (error) {
     res.status(400).send({ errmsg: error.message });
   }
 });

userDetailsRoute.get("/getblockuser", async (req, res) => {
  const {email} = req.body
   try {
    const unblockuser = await UserBlackList.findOne({email})
    res.status(200).send(unblockuser)
   } catch (error) {
     res.status(400).send({ errmsg: error.message });
   }
 });

 userDetailsRoute.post("/blockuser/delete/:email", async (req, res) => {
  const email = req.params.email
   try {
    const deleteBlockUser = await UserBlackList.findByIdAndDelete({email})
   res.status(200).send({"msg":"User Unblocked",deleteBlockUser})
   } catch (error) {
     res.status(400).send({ errmsg: error.message });
   }
 });
 

userDetailsRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  try {
   const deleteUser = await UserModel.findByIdAndDelete({_id:id})
   res.status(200).send({"msg":"User Deleted",deleteUser})
  } catch (error) {
    res.status(400).send({ errmsg: error.message });
  }
});

userDetailsRoute.delete("/deleteOrg/:id", async (req, res) => {
  const id = req.params.id
  try {
   const deleteUser = await Organization.findByIdAndDelete({_id:id})
   res.status(200).send({"msg":"User Deleted",deleteUser})
  } catch (error) {
    res.status(400).send({ errmsg: error.message });
  }
});







module.exports = userDetailsRoute;
