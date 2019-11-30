// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;
var Pusher = require('pusher')
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

const Users = require('./models/user.model.js');
const Partner = require('./models/partnered.model.js');
const Authorization = require('./models/authorization.model.js')
const Tracking = require('./models/tracking.model.js')

// var x = [{ fname: "Aeromel", lname: "Laure", email: "aero@gmail.com", password: "1love@you", address: "Leyte", partneredId: "abc123" },
// { fname: "Mibel", lname: "Paculanang", email: "mibel@gmail.com", password: "m1b3l@love", address: "Santander", partneredId: "mnb456" },
// { fname: "Cherry", lname: "Herrera", email: "cherry@gmail.com", password: "c#3rryM@e", address: "Sultan-Kudarat", partneredId: "hjkl654" },
// { fname: "Faye", lname: "Catalvas", email: "faye@gmail.com", password: "f@y3Erika", address: "Leyte", partneredId: "qwer45" },
// { fname: "Mary", lname: "Tibs", email: "tibs@gmail.com", password: "t1b5M@ry", address: "Dalaguete", partneredId: "asdf12" }]
app.post('/partners', (req, res) => {
    let part = new Partner({ fname: "Mary", lname: "Tibs", email: "tibs@gmail.com", password: "t1b5M@ry", address: "Dalaguete", partneredId: "asdf12" });

    part.save((err, partner) => {
        if (err) {
            res.send(err)
        }
        res.json(partner)
    });
})

app.post('/users', (req, res) => {
    let user = new Users(req.body);

    user.save((err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    });
})

app.post('/login', (req, res) => {
    // console.log(req.body)
    Users.findOne(req.body, (err, user) => {
        if (err) {
            res.status(404).send(err)
        } else if (user != null) {
            // console.log(user.username)
            res.json({ user })
        } else {
            // res.status(404).send("Error")
            Partner.findOne(req.body, (err, part) => {
                if (err) {
                    res.status(404).send(err)
                } else if (part != null) {
                    // console.log(user.username)
                    res.json({ part })
                } else {
                    res.status(404).send("Error")
                }
            })
        }
    })
})

// app.post('/dashboardSearch/:search', (req, res) => {
//     Partner.find({address : req.params.search}, (err, partners) => {
//         console.log(req.params.search)
//         if (err) {
//             res.status(404).send(err)
//         } else if (partners != null) {
//             // console.log(user.username)
//             res.json({ partners })
//         } else {
//             res.status(404).send("Error")
//         }
//     })
// })

app.post('/allPartners', (req, res) => {
    Partner.find({}, (err, partner) => {
        if (err) {
            res.status(404).send(err)
        } else if (partner != null) {
            // console.log(user.username)
            res.json({ partner })
        } else {
            res.status(404).send("Error")
        }
    })
})

app.post('/onePartner/:part', (req, res) => {
    Partner.find({ email: req.params.part }, (err, partner) => {
        if (err) {
            res.status(404).send(err)
        } else if (partner != null) {
            res.json({ partner })
        } else {
            res.status(404).send("Error")
        }
    })
})

app.post('/pusher', (req, res) => {
    var notify = {
        notify: req.body
    }
    var pusher = new Pusher({
        appId: '906630',
        key: 'ea9fe3985cb69d3aff5d',
        secret: 'f4d20401c2e102900b46',
        cluster: 'ap1',
        encrypted: true
    });
    pusher.trigger('form', 'auth', notify);
    res.json({
        message: 'Successful'
    })
    console.log(notify)
})

app.post('/authLetter', (req, res) => {
    let auth = new Authorization(req.body);

    auth.save((err, auth) => {
        if (err) {
            res.send(err)
        }
        res.json(auth)
    });
})

app.post('/trackingInput', (req, res) => {
    let track = new Tracking(req.body);

    track.save((err, auth) => {
        if (err) {
            res.send(err)
        }
        res.json(auth)
    });
})

app.post('/validateTrackingNum/:trackNum', (req, res) => {
    Authorization.find({ trackingNum: req.params.trackNum }, (err, track) => {
        console.log(track)
        if (err) {
            res.status(404).send(err)
        } else if (track === req.params.trackNum) {
            // console.log(user.username)
            res.json({ track })
            console.log(track)
        } else {
            res.status(404).send("Error")
        }
    })
})

app.post('/searchTrack/:trackNum', (req, res) => {
    console.log(req.params.trackNum)
    Tracking.find({ trackingNo: req.params.trackNum }, (err, track) => {
        if (err) {
            res.status(404).send(err)
        } else {
            res.json({ track })
            console.log(track)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});