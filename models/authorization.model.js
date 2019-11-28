const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorizationSchema = new Schema({
    trackingNum: {type: String, required: true},
    senderName: {type: String, required: true},
    senderAddress: {type: String, required: true},
    senderZipCode: {type: String, required: true},
    currentDate: {type: String, required: true},
    receiverAddress: {type: String, required: true},
    receiverName: {type: String, required: true},
    receiverZipCode: {type: String, required: true},
    dueDate: {type: String, required: true},
    documentType: {type: String, required: true},
    identityType: {type: String, required: true},
    idNumber: {type: String, required: true}
})

module.exports = mongoose.model('Authorization', authorizationSchema);