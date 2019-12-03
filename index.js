// Configuration part
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors')
const port = 3000;
const app = express();

app.use('/files', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
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
const Pusher = require('./controllers/pusher.controller.js')

app.post('/partners', Partner.createPartner)
app.post('/allPartners', Partner.fetchAllPartners)
app.post('/profile/:email', Partner.updateInfo)
app.post('/onePartner/:part', Partner.getOnePartner)
app.post('/users', Users.addUser)
app.post('/login', Users.login)
app.post('/oneUser/:email', Users.oneUser)
app.post('/pusher', Authorization.createPusher)
app.post('/authLetter', Authorization.createAuthorization)
app.post('/validateTrackingNum/:trackNum', Authorization.validateAuth)
app.post('/trackingInput', Tracking.createTracking)
app.post('/searchTrack/:trackNum', Tracking.searchTrack)
app.post('/notification', Pusher.createPusher)
app.delete('/deletNotification/:notify', Pusher.deleteNotification)
app.get('/notify/:email', Pusher.findPusher)
app.get('/findNot/:track', Pusher.findPusherTrack)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        file.originalname.replace(" ", "_");
        file.originalname.replace(",", "_");
        var filename = "uploads_"+Date.now(new Date()).toString() +"_"+ file.originalname
        cb(null, filename)
    }
})

var upload = multer({ storage: storage })
let store = ( filename,details , email ,res) => {
    var imgUrl = 'http://localhost:3000/files/' + filename; //save this to db  
    details.profilePic = imgUrl;
    console.log(filename);
    
    Partner.updateInfo(details, email, res)

    
}

app.post('/uploadSingle', upload.single('img'), (req, res, next) => {
    const img = req.file
    var details = JSON.parse(req.body.details)
    var email = req.body.user
    console.log(img);
    
    if (!img) {
        const error = new Error('Please select a file')
        error.httpStatusCode = 400
        return next(error)
    }
    else {
        store(img.filename,details,email,res)
    }
})

// app.post('/retrivePhoto', upload.single('img'), (req, res, next) => {
//     const img = req.file
//     if (!img) {
//         const error = new Error('Please select a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     else {
//         store(img.filename)
//         img.filename =  'http://localhost:3000/files/' + img.filename
//         console.log(img)
//         res.send(img )
//     }
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});