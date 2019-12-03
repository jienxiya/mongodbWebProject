const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, optional: true}
})

module.exports = mongoose.model('Users', userSchema);