const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: false
	},
	lastName: {
		type: String,
		required: false
	},
	dob: {
		type: Date,
		required: false
	},
	profilePhoto: {
		type: Buffer,
		contentType: String,
		default: ''
	},
	streamKey: String
})

const User = mongoose.model('User', userSchema)

module.exports = User