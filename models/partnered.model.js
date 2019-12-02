const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const partnerSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    partneredId: {type: String, required: true},
    profile: {type: String, optional: true}
})

module.exports = mongoose.model('Partner', partnerSchema);