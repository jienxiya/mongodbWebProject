const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pusherSchema = new Schema({
    tracknum: {type: String, required: true},
    email: {type: String, required: true},
    senderEmail: {type: String, required: true},
})

module.exports = mongoose.model('Pusher', pusherSchema);