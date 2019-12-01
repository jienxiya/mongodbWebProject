// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
let db_url = 'mongodb://127.0.0.1/iConnect';
mongoose.connect(db_url, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Users = require('./controllers/user.controller.js');
const Partner = require('./controllers/partner.controller.js');
const Authorization = require('./controllers/authorization.controller.js')
const Tracking = require('./controllers/tracking.controller.js')

// var x = [{ fname: "Aeromel", lname: "Laure", email: "aero@gmail.com", password: "1love@you", address: "Leyte", partneredId: "abc123" },
// { fname: "Mibel", lname: "Paculanang", email: "mibel@gmail.com", password: "m1b3l@love", address: "Santander", partneredId: "mnb456" },
// { fname: "Cherry", lname: "Herrera", email: "cherry@gmail.com", password: "c#3rryM@e", address: "Sultan-Kudarat", partneredId: "hjkl654" },
// { fname: "Faye", lname: "Catalvas", email: "faye@gmail.com", password: "f@y3Erika", address: "Leyte", partneredId: "qwer45" },
// { fname: "Mary", lname: "Tibs", email: "tibs@gmail.com", password: "t1b5M@ry", address: "Dalaguete", partneredId: "asdf12" }]
app.post('/partners', Partner.createPartner)

app.post('/allPartners', Partner.fetchAllPartners)

app.post('/onePartner/:part', Partner.getOnePartner)

app.post('/users', Users.addUser)

app.post('/login', Users.login)

app.post('/pusher', Authorization.createPusher)

app.post('/authLetter', Authorization.createAuthorization)

app.post('/validateTrackingNum/:trackNum', Authorization.validateAuth)

app.post('/trackingInput', Tracking.createTracking)

app.post('/searchTrack/:trackNum', Tracking.searchTrack)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});