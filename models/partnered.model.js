const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const partnerSchema = new Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    phoneNum: {type: String, required: true},
    partneredId: {type: String, optional: true},
    profile: {type: String, optional: true}
})

module.exports = mongoose.model('Partner', partnerSchema);