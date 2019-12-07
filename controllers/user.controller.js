const Users = require('../models/user.model.js');
const Partner = require('../models/partnered.model.js');

module.exports.addUser = (req, res) => {
    let user = new Users(req.body);

    user.save((err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    });
}

module.exports.login = (req, res) => {
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
}

module.exports.oneUser = (req, res) => {
    Users.findOne({email: req.params.email}, (err, user) => {
        if (err) {
            res.status(404).send(err)
        } else if (user != null) {
            // console.log(user.username)
            res.json({ user })
        } else {
            res.status(404).send("Error")
        }
    })
}

module.exports.userData = (req, res) => {
    console.log(req.params.mail)
    console.log(req.body)
    Users.update({ email: req.params.mail }, { $set: req.body }, { new: true }, (err, update) => {
        if (err) {
            res.send(err)
        } else {
            res.json(update)
            console.log(update)
        }
    })
}

module.exports.UserInfo = (details, email, res) => {
    //  console.log(details);
    Users.findOneAndUpdate({ email: email }, details, { new: true }, (err, update) => {
        if (err) {
            res.send(err)
        } else {
            res.send(update)
        }
    })
}