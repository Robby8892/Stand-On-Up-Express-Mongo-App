const Chat = require('../models/chat.js')
const User = require('../models/user.js')
const session = require('express-session')




createChat = async (req,res,next) => {
	try {

		// I want to be able to make this chat open to everyone on the site
		// eventually when videos are made there will need to a check to see if the video is already has a
		// public view
		console.log(req.body.data);
		if(req.body.data.public == true){
			console.log('public');


			const newChat = {
				body: req.body.data.body,
				userOwner: req.body.data.userOwner,
				users: [],
				public: req.body.data.public
			}

			const allUsers = await User.find()

			allUsers.forEach((user)=>{

				newChat.users.push(user._id)
			})


			console.log(newChat);

			const createChat = await Chat.create(newChat)

			console.log(createChat);

			res.status(200).json({
				data: createChat,
				success: true,
				message: 'You succesfully created a new chat!',
				status: 201
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


getAllChats = async (req,res,next) => {
	try {

		const allChats = await Chat.find().populate('userOwner')

		allChats.forEach((chat)=>{
			chat.userOwner.password = '*********************'

			chat.users.forEach((user)=>{
				user.password = '**********************'
			})

		})
		
		res.status(200).json({
			success: true,
			data: allChats,
			message: 'You got all the chats!'
		})

	}catch(err){
		next(err)
	}

}

getAllUserChats = async (req,res,next) => {
	try {

		const userChats = await Chat.find({users: req.session.userId})

		res.status(200).json({
			data: userChats,
			success: true,
			message: 'Here all all your chats'
		})

	}catch(err){
		next(err)
	}

}

findChatById = async (req,res,next) => {
	try {

		const findChatById = await Chat.findById(req.params.id).populate('users')

		findChatById.users[0].password = '**********************'

		res.status(200).json({
			data: findChatById,
			success: true,
			message: `Here is the chat you requested chat id - ${findChatById._id}`
		})

	}catch(err){
		next(err)
	}

}	

deleteMyChat = async (req,res,next) => {
	try {

		console.log(req.params.id);

		const deleteChat = await Chat.findByIdAndRemove(req.params.id)

		if(!deleteChat){

			res.status(400).json({
				data:{},
				success: false,
				error: 'No id matches the one provided to delete in the database'
			})

		}else{

			res.status(200).json({
				data:{},
				success: true,
				message: 'You succesfully deleted the chat!'
			})		

		}
	}catch(err){
		next(err)
	}

	}		


module.exports = {
	createChat,
	getAllChats,
	getAllUserChats,
	deleteMyChat,
	findChatById
}	