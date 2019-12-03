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
const Pusher = require('./models/pusher.model.js')

app.post('/partners', Partner.createPartner)

app.post('/allPartners', Partner.fetchAllPartners)

app.post('/profile/:email', Partner.updateInfo)

app.post('/onePartner/:part', Partner.getOnePartner)

// app.post('/updateProf/:email', Partner.oneUser)

app.post('/users', Users.addUser)

app.post('/login', Users.login)

app.post('/oneUser/:email', Users.oneUser)

app.post('/pusher', Authorization.createPusher)

app.post('/authLetter', Authorization.createAuthorization)

app.post('/validateTrackingNum/:trackNum', Authorization.validateAuth)

app.post('/trackingInput', Tracking.createTracking)

app.post('/searchTrack/:trackNum', Tracking.searchTrack)

app.delete('/deletNotification/:notify', (req, res) => {
    Pusher.deleteOne({tracknum: req.params.notify}, (err, deleteSuccess) => {
        if(err){
            res.json(err)
        }else{
            res.json(deleteSuccess)
        }
    })
})

app.post('/notification', (req, res) => {
    console.log(req.body)
    let push = new Pusher(req.body)
    push.save((err, pusher) => {
        if(err){
            res.json(err)
        }else(
            res.json(pusher)
        )
    })
})

app.get('/notify/:email', (req, res) => {
    Pusher.find({ email: req.params.email }, (err, pusher) => {
        if (err) {
            res.status(404).send(err)
        } else if (pusher != null) {
            console.log(pusher)
            res.json({ pusher })
        } else {
            res.status(404).send("Error")
        }
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var filename = "uploads_"+Date.now(new Date()).toString() +"_"+ file.originalname
        cb(null, filename)
    }
})

var upload = multer({ storage: storage })

// function to save image   rl  to mongodb
let store = (filename) => {
    //your servername + filename
    var imgUrl = 'http://localhost:3000/files/uploads/' + filename; //save this to db  
}

app.post('/uploadSingle', upload.single('img'), (req, res, next) => {
    const img = req.file
    if (!img) {
        const error = new Error('Please select a file')
        error.httpStatusCode = 400
        return next(error)
    }
    else {
        store(img.filename)
        img.filename =  'http://localhost:3000/files/' + img.filename
        console.log(img)
        res.send(img )
    }
})

app.post('/retrivePhoto', upload.single('img'), (req, res, next) => {
    const img = req.file
    if (!img) {
        const error = new Error('Please select a file')
        error.httpStatusCode = 400
        return next(error)
    }
    else {
        store(img.filename)
        img.filename =  'http://localhost:3000/files/' + img.filename
        console.log(img)
        res.send(img )
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});