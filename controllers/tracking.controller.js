const Tracking = require('../models/tracking.model.js')

module.exports.createTracking = (req, res) => {
    let track = new Tracking(req.body);

    track.save((err, auth) => {
        if (err) {
            res.send(err)
        }
        res.json(auth)
    });
}

module.exports.searchTrack = (req, res) => {
    console.log(req.params.trackNum)
    Tracking.find({ trackingNo: req.params.trackNum }, (err, track) => {
        if (err) {
            res.status(404).send(err)
        } else {
            res.json({ track })
            console.log(track)
        }
    })
}