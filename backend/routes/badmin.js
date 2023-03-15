var express = require("express");
var router = express.Router();

// Load Badmin model
const Badmin = require("../models/badmin_m");
const User = require("../models/user_m");

// GET request 
// Getting the user by his email
router.get("/vprofile/:email", function(req, res) {
    const { email } = req.params;

    Badmin.findOne({ email }).then(badmins => {
		// Check if badmins email exists
		if (!badmins) {
			res.status(405).json({
				message: req.body,
			});
        }
        else{
            res.json(badmins);
        }
	})
    .catch(err => {
        console.log(err);
        res.send(err);
    });
});

// edit badmin details 
router.put("/editvpr", function(req, res) {
    const email = req.body.email;
    const filter = { email: email };
    const update = {
        Name: req.body.Name,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        password: req.body.password, 
        CompanyID: req.body.CompanyID,
        CompanyPass: req.body.CompanyPass,
    };

    Badmin.findOneAndUpdate(filter, update, { new: true }).then( badmins => {
        res.json(badmins);
    })
    .catch(err => {
        console.log(err);
        res.status(403).send(err);
    })
});

// POST request 
// Add a badmin to db
router.post("/vregister", (req, res) => {
    const newBadmin = new Badmin({
        Name: req.body.Name,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        password: req.body.password,
        CompanyID: req.body.CompanyID,
        CompanyPass: req.body.CompanyPass,
    });
    
    if( newBadmin.Name === "" || newBadmin.email === "" || newBadmin.ContactNo === "" || newBadmin.CompanyID === "" || newBadmin.CompanyPass === "" )
    {
        res.status(401).send("Please fill all the fields");
    }

    // User.findOne({ email: newBadmin.email }).then(users => {
        // if (users) {
            // res.status(405).send("Email already exists");
        // }
    // });


    newBadmin.save()
        .then(badmins => {
            res.status(200).json(badmins);
        })
        .catch(err => {
            console.log(err);
            res.status(403).send(err);
        });
});

// delete food item by id
router.delete("/delete/:email", function(req, res) {
    const { email } = req.params;

    Badmin.deleteOne({ email: email }).then(badmins => {
        res.json(badmins);
    })
    .catch(err => {
        console.log(err);
        res.status(502).send(err);
    });
});

module.exports = router;
