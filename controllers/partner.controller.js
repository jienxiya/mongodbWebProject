const Partner = require('../models/partnered.model.js');

// var x = [{ fname: "Aeromel", lname: "Laure", email: "aero@gmail.com", password: "1love@you", address: "Leyte", partneredId: "abc123" },
// { fname: "Mibel", lname: "Paculanang", email: "mibel@gmail.com", password: "m1b3l@love", address: "Santander", partneredId: "mnb456" },
// { fname: "Cherry", lname: "Herrera", email: "cherry@gmail.com", password: "c#3rryM@e", address: "Sultan-Kudarat", partneredId: "hjkl654" },
// { fname: "Faye", lname: "Catalvas", email: "faye@gmail.com", password: "f@y3Erika", address: "Leyte", partneredId: "qwer45" },
// { fname: "Mary", lname: "Tibs", email: "tibs@gmail.com", password: "t1b5M@ry", address: "Dalaguete", partneredId: "asdf12" }]
module.exports.createPartner = (req, res) => {
    let part = new Partner({ fname: "Mary", lname: "Tibs", email: "tibs@gmail.com", password: "t1b5M@ry", address: "Dalaguete", partneredId: "asdf12" });

    part.save((err, partner) => {
        if (err) {
            res.send(err)
        }
        res.json(partner)
    });
}

module.exports.fetchAllPartners = (req, res) => {
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
}

module.exports.getOnePartner = (req, res) => {
    Partner.find({ email: req.params.part }, (err, partner) => {
        if (err) {
            res.status(404).send(err)
        } else if (partner != null) {
            res.json({ partner })
        } else {
            res.status(404).send("Error")
        }
    })
}