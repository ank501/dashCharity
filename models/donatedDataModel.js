const mongoose = require('mongoose');

const donatedDataSchema = new mongoose.Schema({
    name : {type : String, required : true},
    amount : {type : Number, required : true},
    message : {type : String, required : true},
    country : {type : String, required : true},
    date : {type : Date, required : true},
    category : {type : String, enum : ['health', 'education', 'food', 'ukrain donation']}
})

const DonatedDataModel = mongoose.model('donatedData', donatedDataSchema);

module.exports = DonatedDataModel;