// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/iConnect';
mongoose.connect(db_url, { useNewUrlParser: true });
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//
// Let's start the exercise :
//
// During ALL the exercise the requests have to be connected with the database
//
// Context : We want to create a web application to manage a motorcyle Championship. 
// ------------------------------------------------------------

// Import Models
// const user = require('./models/user.model');
const Users = require('./models/user.model.js');
// const PartneredUsers = require('./models/partneredUser.model.js')
const Partner = require('./models/partnered.model.js');
const Tracking = require('./models/track.model.js')
const TrackingInfo = require('./models/trackingInfo.model.js')

// Question 1 - Create a HTTP Request to add a users in the database :
// When we create a user he doesn't have a score yet.
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

app.get('/dashboardSearch', (req, res) => {
    Partner.find(req.body, (err, partners) => {
        console.log(req.body)
        if (err) {
            res.status(404).send(err)
        } else if (partners != null) {
            // console.log(user.username)
            res.json({ partners })
        } else {
            res.status(404).send("Error")
        }
    })
})

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

// app.post('/tracking', (req, res) => {
//     let track = new Tracking({
//         trackingNo: req.body.track,
//         form: req.body.subForm
//     });

//     track.save((err, track) => {
//         if (err) {
//             res.send(err)
//         }
//         res.json({ track })
//     });
// })

// app.post('/addTrack', (req, res) => {
//     let track = new Tracking({
//         trackingNo: "09161571895",
//         form: "The quick brown fox jumps over the lazy dog"
//     });

//     track.save((err, track) => {
//         if (err) {
//             res.send(err)
//         }
//         res.json({ track })

//         let tracking = new TrackingInfo({
//             trackingNo: Tracking._id,
//             address: "America"
//         });

//         tracking.save((err, trackings) => {
//             if(err) {
//                 res.send(err)
//             }
//             res.json({ trackings })
//         })
//     });
// })

// app.post('/findTrack', (req, res) => {
//     TrackingInfo.
//         findOne({ trackingNo: '09161571895' }).
//         populate('Tracking').
//         exec(function (err, tracking) {
//             if (err) return handleError(err);
//             console.log('This is the output', tracking.trackingNo);
//             res.json(trackingInfo.Tracking)
//             // prints "The author is Ian Fleming"
//         });
// })


// // Question 4 - Create a HTTP Request to update firstName or/and lastName of a user :
// app.put('/update', (req, res) => {
//     var id = req.body.id
//     const updateFL = {
//         firstName: "Mhine",
//         lastName: "Laure"
//     }

//     user.findByIdAndUpdate(id,  updateFL, (err, updated) => {
//         if(err){
//             res.send(err)
//         }
//         res.json({updated})
//     })
// })


// // Question 5 - Create a HTTP Request to ADD score of a user :
// app.put('/addScore', (req, res) => {
//     var id = req.body.id
//     const addScore = {
//         score: req.body.score
//     }

//     user.findByIdAndUpdate(id,  addScore, (err, updated) => {
//         if(err){
//             res.send(err)
//         }
//         res.json({updated})
//     })
// })


// // Question 6 - Create a HTTP Request to delete one user :
// app.delete('/delete', (req, res) => {
//     user.findByIdAndDelete(req.body.id, (err, deleted) => {
//         if(err){
//             res.send(err)
//         }
//         res.json({deleted})
//     })
// })


// // Question 7 - Create a HTTP Request to create motorcycles :
// // For create a motorcycle you will need to create the model first..
// app.post('/addMotorcycle', (req, res) => {
//     let addMotor = new Motorcycle(
//         {
//             manufacturer: req.body.manu,
//             displacement: req.body.dis,
//             weight: req.body.weight
//         }
//     );

//     addMotor.save((err, motor) => {
//         if(err){
//             res.send(err)
//         }
//         res.json(motor)
//     });
// })


// // Question 8 - Create a HTTP Request to fetch all the motorcycles:
// app.get('/allMotorcycles', (req, res) => {
//     Motorcycle.find({}, (err, motor) => {
//         if(err){
//             res.send(err)
//         }
//         res.json({motor: motor})
//     })
// })


// // Question 9 - Create a HTTP Request to fetch all the motorcycles associate to one user:
// app.get('/allMotorcyclesuser', (req, res) => {
//     user.find().where('Laure').all({Motorcycle})
// })


// BONUS 10 - Create a HTTP Request to to get the users ranking


//
// End of the exercise
// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});