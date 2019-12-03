const Authorization = require('../models/authorization.model.js')
var Pusher = require('pusher')

module.exports.createAuthorization = (req, res) => {
    let auth = new Authorization(req.body);

    auth.save((err, auth) => {
        if (err) {
            res.send(err)
        }
        res.json(auth)
    });
}

module.exports.validateAuth = (req, res) => {
    Authorization.find({ trackingNum: req.params.trackNum }, (err, track) => {
        console.log(track)
        if (err) {
            res.status(404).send(err)
        } else if (track !== null) {
            // console.log(user.username)
            res.json({ track })
            console.log(track)
        } else {
            res.status(404).send("Error")
        }
    })
}

module.exports.createPusher = (req, res) => {
    // var notify = {
        // notify: req.body
    // }
    var pusher = new Pusher({
        appId: '906630',
        key: 'ea9fe3985cb69d3aff5d',
        secret: 'f4d20401c2e102900b46',
        cluster: 'ap1',
        encrypted: true
    });
    pusher.trigger('form', 'auth', {notify: req.body});
    res.json({
        message: 'Successful'
    })
    console.log(req.body)
}