const mongoose = require('mongoose')

const User = require('./user')

const chatSchema = mongoose.Schema({

	body: {
		type: String,
		required: true
	},
	userOwner:{ type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: true
	},
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	public: Boolean

})

const Chat = mongoose.model('Chat', chatSchema)


module.exports = Chat