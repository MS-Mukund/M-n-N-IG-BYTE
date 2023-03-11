var express = require("express");
var router = express.Router();

// Load User model
const User  = require("../models/user_m");
const Badmin = require("../models/badmin_m");

// Login
router.post("/vlogin", (req, res) => {
	const email = req.body.email;
    const password = req.body.password;
	// Find user by email
	Badmin.findOne({ email, password }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.json({
				status: "Badmin not found",
			});
        }
        else{
            //res.data.user = user;
            res.send({message: "Badmin Found", user: user});
            return user;
        }
	});
});

// Login
router.post("/blogin", (req, res) => {
	const email = req.body.email;
    const password = req.body.password;

    const errorUser = new User({
        email:"not found",
    })
	// Find user by email
	User.findOne({ email, password }).then(users => {
		// Check if users email exists
		if (!users) {
            return res.json({
				status: "User not found",
			});
        }
        else{        
            res.send({message:"User Found",users:users,status:"success"});
            return users;
        }
	});
});

// // POST request 
// // Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
//     var flag = 0;
    
//     User.findOne({ email }).then(users => {
//         if( !users) {
//         }
//         else{
//             if( req.body.password === users.password ){
//                 flag = 1;
//                 res.status(200).send([1, users.email]);
//                 return;
//             }
//             else
//             {
//                 flag = 1;
//                 res.status(400).send("Incorrect Badmin password");
//                 return;
//             }
//         }
//     })
//     .catch(err => {
//         flag = 1;
//         console.log(err);
//         res.status(402).send(err);
//     });

//     if( flag === 0 )
//     {
//         Badmin.findOne({ email }).then(badmins => {
//             if( !badmins) {
//                 res.status(401).send("Email does not exist");
//             }
//             else{
//                 if( req.body.password === badmins.password ){
//                     res.status(200).send([0, badmins.email]);
//                     return;
//                 }
//                 else
//                 {
//                     res.status(400).send("Incorrect Badmin password");
//                     return;
//                 }
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(403).send(err);
//         });
//     }
// });

module.exports = router;