var express = require("express");
var router = express.Router();

// Load User model
const Event = require("../models/event_m");
const Badmin = require("../models/badmin_m");
const User = require("../models/user_m");

// GET request 
// Getting all the users
router.get("/badmin", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// POST request 
// Add a user to db
router.post("/badmin/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(411).send(err);
        });
});

module.exports = router;
