require('dotenv').config();
const jwt = require('jsonwebtoken');
const adminauthMiddleware = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
   
    if(token == undefined){
        return res.status(400).send({'msg' : 'Token not found'});
    }

    
    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if(decoded){
            req.body.adminUserId = decoded.userId;
            req.body.adminName = decoded.name;
            next()
        }
        else{
            res.status(400).send({'msg' : 'Invalid token'});
        }
    })
}

module.exports = adminauthMiddleware;