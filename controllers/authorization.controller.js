const Authorization = require('../models/authorization.model.js')
const PusherController = require('./pusher.controller')
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
        key: '19f814902a00899fa4c5',
        secret: 'f4d20401c2e102900b46',
        cluster: 'ap1',
        encrypted: true
    });
    pusher.trigger('my-channel', 'my-event', {notify: req.body});

    res.json({
        message: 'Successful'
    })
    console.log(req.body)
    // PusherController.createPusher(req, res)
}