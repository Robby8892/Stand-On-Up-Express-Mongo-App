const Chat = require('../models/chat.js')
const User = require('../models/user.js')
const session = require('express-session')




createChat = async (req,res,next) => {
	try {

		// I want to be able to make this chat open to everyone on the site
		// eventually when videos are made there will need to a check to see if the video is already has a
		// public view
		if(req.body.public == true){
			console.log('public');


			const newChat = {
				body: req.body.body,
				users: [],
				public: req.body.public
			}

			const allUsers = await User.find()

			allUsers.forEach((user)=>{
				console.log(user._id);

				newChat.users.push(user._id)
			})


			console.log(newChat);

			const createChat = await Chat.create(newChat)

			console.log(createChat);

			res.status(200).json({
			success: true,
			message: 'Made it here on create chat api route public'
		})
		}else{
			// if the user choose private I want to take 
			// their input of who they want to be added to this chat
			// and push them in by the id's that are selected
			// likely this will have to be a iteration 
			console.log('private');

			const createChat = await Chat.create(req.body)

			res.status(200).json({
			success: true,
			message: 'Made it here on create chat api route private'
			})			
		}

		

	}catch(err){
		next(err)
	}

	}




module.exports = {
	createChat
}	