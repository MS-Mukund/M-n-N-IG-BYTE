var express = require("express");
var router = express.Router();

// Load User model
const Food = require("../models/fooditems_m");

// GET request 
// Getting badmins items by his email
router.get("/vItems/:email", function(req, res) {
    const { email } = req.params;

    Food.find({ BadminEmail: email }).then(items => {
        res.json(items);
	})
    .catch(err => {
        console.log(err);
        res.status(414).send(err);
    });
});

// getting all food items
router.get("/vItems", function(req, res) {
    
    Food.find().then(items => {
        res.json(items);
    })
    .catch(err => {
        console.log(err);
        res.status(415).send(err);
    });
});


// get items by id
router.get("/vFullinfo/:id", function(req, res) {
    const { id } = req.params;

    Food.find({ _id: id }).then(items => {
        res.json(items);
    })
    .catch(err => {
        console.log(err);
        res.status(416).send(err);
    });
});

// add food
router.post("/newFood", function(req, res) {
    const newFood = new Food({
        name: req.body.name,
        BadminEmail: req.body.BadminEmail,
        Price: req.body.Price,
        rating: req.body.rating,
        FoodType: req.body.FoodType,
        AddOns: req.body.AddOns,
        tags: req.body.tags,
    });

    Food.findOne({name: req.body.name, BadminEmail: req.body.BadminEmail}).then(food => {
        if(food)
        {
            res.status(417).json({
                error: "You are already selling this item"
            });
        }
        else
        {
            newFood.save().then(food => res.json(food))
            .catch(err => res.status(418).send(err));
        }
    });
});

// get food by id
router.get("/show/:id", function(req, res) {
    const { email, id } = req.params;

    Food.find({ _id: id }).then(items => {
        res.json(items);
    })
    .catch(err => {
        console.log(err);
        res.status(419).send(err);
    });
});

//edit food item by id
router.put("/edit/:id", function(req, res) {
    const { id } = req.params;
    const filter = { _id: id };
    const update = {
        name: req.body.name,
        BadminEmail: req.body.BadminEmail,
        Price: req.body.Price,
        rating: req.body.rating,
        FoodType: req.body.FoodType,
        tags: req.body.tags,
    };
    Food.findByIdAndUpdate( filter, update, {new: true}).then(food => {
        res.json(food);
    }
    ).catch(err => {
        console.log(err);
        res.status(501).send(err);
    });
});

// delete food item by id
router.delete("/delete/:id", function(req, res) {
    const { id } = req.params;

    Food.deleteOne({ _id: id }).then(food => {
        res.json(food);
    })
    .catch(err => {
        console.log(err);
        res.status(420).send(err);
    });
});

module.exports = router;
