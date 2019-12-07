const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullname: {type: String, optional: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: String, optional: true},
    phoneNum: {type: String, optional: true},
    profilePic: {type: String, optional: true}
})

module.exports = mongoose.model('Users', userSchema);