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
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	dob: {
		type: Date,
		required: true
	},
	profilePhoto: {
		type: Buffer,
		contentType: String,
		default: ''
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User