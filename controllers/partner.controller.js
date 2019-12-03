const Partner = require('../models/partnered.model.js');
// { fullname: "Cherry Mae Herrera", username: "Cherr", email: "che@gmail.com", password: "1love@you", address: "Sultan Kudarat", phoneNum: "09994959196" }
// { fullname: "Mary Jane Paller", username: "Mj", email: "mj@gmail.com", password: "dems@143mj", address: "Bohol", phoneNum: "09262290384" }
// { fullname: "Aeromel Laure", username: "Aero", email: "aero@gmail.com", password: "1love@you", address: "Leyte", phoneNum: "09161571895" }
// { fullname: "Merry Cris Ajoc", username: "Cris", email: "ajoc@gmail.com", password: "ajok@123", address: "Baybay, Leyte", phoneNum: "09993429618" }
// { fname: "Faye", lname: "Catalvas", email: "faye@gmail.com", password: "f@y3Erika", address: "Leyte", partneredId: "qwer45" },
// { fname: "Mary", lname: "Tibs", email: "tibs@gmail.com", password: "t1b5M@ry", address: "Dalaguete", partneredId: "asdf12" }]
module.exports.createPartner = (req, res) => {
    let part = new Partner({ fullname: "Merry Cris Ajoc", username: "Cris", email: "ajoc@gmail.com", password: "ajok@123", address: "Baybay, Leyte", phoneNum: "09993429618" });

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
            console.log(partner)
            res.json({ partner })
        } else {
            res.status(404).send("Error")
        }
    })
}

// module.exports.updateData = (req, res) => {
//     const value = {
//         profile: req.body
//     }

//     Partner.findByIdAndUpdate({id: req.params.myId},  value, (err, updated) => {
//         if(err){
//             res.json(err)
//         }else{
//             res.json({updated})
//         }
//     })
// }

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
