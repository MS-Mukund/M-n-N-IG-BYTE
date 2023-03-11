var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/user_m");
const Badmin = require("../models/badmin_m");

// GET request 
// Getting the user by his email
router.get("/bprofile/:email", function(req, res) {
    const { email } = req.params;

    User.findOne({ email }).then(users => {
		// Check if users email exists
		if (!users) {
			res.status(404).json({
				error: "User does not exist",
			});
        }
        else{
            res.json(users);
        }
	})
    .catch(err => {
        console.log(err);
        res.status(412).send(err);
    });
});

// edit user details 
router.put("/editbpr", function(req, res) {
    const email = req.body.email;
    const filter = { email: email };
    const update = {
        name: req.body.name,
        email: req.body.email,
        ContactNo: req.body.ContactNo,

        password: req.body.password,
        Age: req.body.Age,
        BatchName: req.body.BatchName,
        Wallet: req.body.Wallet,
    };

    User.findOneAndUpdate(filter, update, { new: true }).then( badmins => {
        res.json(badmins);
    })
    .catch(err => {
        console.log(err);
        res.status(403).send(err);
    })
});

// delete food item by id
router.delete("/delete/:email", function(req, res) {
    const { email } = req.params;

    User.deleteOne({ email: email }).then(users => {
        res.json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(502).send(err);
    });
});

// POST request 
// Add a user(user) to db
router.post("/bregister", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        password: req.body.password,
        Age: req.body.Age,
        BatchName: req.body.BatchName,
        Favorites: [], 
        Wallet: 0
    });

    Badmin.findOne({ email: req.body.email }).then(badmins => {
        if (badmins) {
            res.status(400).send("Email already exists");
        }
    });    

    newUser.save()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(413).send(err);
        });
});

// update user wallet
router.put("/updatewallet/:id", function(req, res) {
    const { id } = req.params;
    const filter = { _id: id };
    const update = {
        Wallet: req.body.Wallet
    };

    User.findOneAndUpdate(filter, update, { new: true }).then( users => {
        res.json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(403).send(err);
    })
});

router.post("/fav/create", function(req, res) {
    const { Fid, Bid } = req.body;
    const filter = { _id: Bid };
    
    // push the food item id to favorites array
    const update = {
        $push: { Favorites: Fid }
    };

    User.findOneAndUpdate(filter, update, { new: true }).then( users => {
        res.json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(403).send(err);
    })
});

module.exports = router;
