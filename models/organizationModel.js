const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    contactEmail: {
        type: String,
        required: true
    },
    website: {
        type: String
    }
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;