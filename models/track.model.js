const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userTrack = new Schema({
    trackingNo: {type: String, required: true},
    form: {type: String, required: true},
})

module.exports = mongoose.model('Tracking', userTrack);