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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/user';
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
const Users = require('./models/user.model.js')


// Question 1 - Create a HTTP Request to add a users in the database :
// When we create a user he doesn't have a score yet.
app.post('/users', (req, res) => {
    let user = new Users(req.body);

    user.save((err, user) => {
        if(err){
            res.send(err)
        }
        res.json(user)
    });
})


// Question 2 - Create a HTTP Request to fetch all the users :
// app.get('/allusers', (req, res) => {
//     user.find({}, (err, user) => {
//         if(err){
//             res.send(err)
//         }
//         res.json({user: user})
//     })
// })


// Question 3 - Create a HTTP Request to fetch one user :
app.post('/login', (req, res) => {
    console.log(req.body)
    Users.findOne(req.body, (err, user) => {
        console.log(user)

        if(err){
            res.status(404).send(err)
        }else if(user != null){
            res.json({user})
        }else{
            res.status(404).send("Error")
        }
    })
})


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