const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: 'Your Name'
	},
	OrgName: {
		type: String,
		required: 'Your Organization Name'
	},
	email: {
		type: String,
		unique: 'This email is already registered',
		required: 'We wanna know your email',
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
	Age : {
		type: Number,
		required: false,
		$lt : [110, 'invalid age'],
		$gt : [3, 'invalid age']
	}, 
	Upcoming: [{ type: Schema.Types.ObjectId, ref: 'Event' }], 
	Completed: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

module.exports = User = mongoose.model("User", UserSchema);