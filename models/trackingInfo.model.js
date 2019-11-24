const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trackingInfo = new Schema({
    trackingNo: {type: String, required: true},
    address: {type: String, required: true},
})

module.exports = mongoose.model('TrackingInfo', trackingInfo);