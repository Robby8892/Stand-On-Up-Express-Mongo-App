const Chat = require('../models/chat.js')
const session = require('express-session')




createChat = async (req,res,next) => {
	try {

		res.status(200).json({
			success: true,
			message: 'Made it here on create chat api route'
		})

	}catch(err){
		next(err)
	}

	}




module.exports = {
	createChat
}	