const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BadminSchema = new Schema({
	Name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: 'This email is already registered',
		required: 'This is a required field',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
	}, 
	ContactNo : {
		type: Number,
		validate: {
			validator: function(v) {
			  return /\d{10}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		  },
		required: 'Enter a 10-digit contact number'
	},
	password: {
		type: String,
		required: 'Password cannot be null'
	},
	CompanyID: {
		type: Number,
		required: 'CompanyID cannot be null'
	},
	CompanyPass: {
		type: String,
		required: 'Company Password cannot be null'
	},
});

module.exports = Badmin = mongoose.model("Badmin", BadminSchema);