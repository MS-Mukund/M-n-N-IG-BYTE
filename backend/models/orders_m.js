const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	Fid: { 
		type: String,
		// ref: 'Food',
		required: 'Food ID is required'
	}, 
	Bid: {
		type: String,
		// ref: 'User',
		required: 'User ID is required'
	},
	BadminEmail: {
		type: String,
		// ref: 'Badmin',
		required: 'Badmin ID is required'
	},
	PlacedTime: {
		type: Number,
		required: 'Placed Time is required'
	},
	Fname: {
		type: String,
		required: 'Food Name is required'
	},
	Cost: {
		type: Number,
		$gt: [0, 'invalid cost'],
		required: true
	},
	Quantity: {
		type: Number,
		$gt: [0, 'invalid quantity'],
		required: true
	},
	Status: {
		type: Number
	}, 
	Rating: {
		type: Number,
		$gte: [0, 'invalid rating'],
		$lte: [5, 'invalid rating'],
		default: '3'
	}
});

module.exports = Order = mongoose.model("Order", OrderSchema);
