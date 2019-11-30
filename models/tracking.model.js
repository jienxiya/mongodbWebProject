const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userTrack = new Schema({
    trackingNo: {type: String, required: true},
    sendTo: {type: String, required: true},
    locationTo: {type: String, required: true},
    date: {type: String, required: true},
})

module.exports = mongoose.model('Tracking', userTrack);