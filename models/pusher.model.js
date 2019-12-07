const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pusherSchema = new Schema({
    tracknum: {type: String, required: true, index: { unique: true, dropDups: true }},
    email: {type: String, required: true},
    senderEmail: {type: String, required: true},
    read: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('Pusher', pusherSchema);