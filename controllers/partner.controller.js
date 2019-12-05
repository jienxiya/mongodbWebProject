const Partner = require('../models/partnered.model.js');
// { fullname: "Cherry Mae Herrera", username: "Cherr", email: "che@gmail.com", password: "1love@you", address: "Sultan Kudarat", phoneNum: "09994959196" }
// { fullname: "Mary Jane Paller", username: "Mj", email: "mj@gmail.com", password: "dems@143mj", address: "Bohol", phoneNum: "09262290384" }
// { fullname: "Aeromel Laure", username: "Aero", email: "aero@gmail.com", password: "1love@you", address: "Leyte", phoneNum: "09161571895" }
// { fullname: "Merry Cris Ajoc", username: "Cris", email: "ajoc@gmail.com", password: "ajok@123", address: "Baybay, Leyte", phoneNum: "09993429618" }
module.exports.createPartner = (req, res) => {
    let part = new Partner({ fullname: "Jericho James Villahermosa", username: "Jj", email: "jj@gmail.com", password: "1love@lorly", address: "Dalaguete", phoneNum: "09321654987" });

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
    console.log(req.params.part)
    Partner.find({ email: req.params.part }, (err, partner) => {
        if (err) {
            res.status(404).send(err)
        } else if (partner != null) {
            // console.log(partner)
            res.json({ partner })
        } else {
            res.status(404).send("Error")
        }
    })
}

module.exports.updateInfo = (details, email, res) => {
    //  console.log(details);
    Partner.findOneAndUpdate({ email: email }, details, { new: true }, (err, update) => {
        if (err) {
            res.send(err)
        } else {
            res.send(update)
        }
    })
}

module.exports.updateData = (req, res) => {
    Partner.update({ email: req.params.email }, { $set: req.body }, { new: true }, (err, update) => {
        if (err) {
            res.send(err)
        } else {
            res.json(update)
            console.log(update)
        }
    })
}
