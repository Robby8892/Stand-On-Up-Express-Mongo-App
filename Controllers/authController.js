const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport')
const localStragety = require('passport-local')
const shortid = require('shortid')

passport.serializeUser((user, cb)=>{
	cb(null, user)
})

passport.deserializeUser((obj, cb)=>{
	cb(null, obj)
})








createUserRegister = async (req, res) => {
	try {


	const body = req.body.data

	const usernameAlreadyExists = await User.findOne({username: body.username})

	const emailAlreadyExists = await User.findOne({email: body.email})
	console.log(emailAlreadyExists);
	console.log(usernameAlreadyExists);
	if(body.username.length <= 0 || body.email.length <= 0 || body.password.length <= 0){


		return res.status(400).json({
			status: 400,
			success: false,
			error: 'You must provide user information'
		})
	}


	if(usernameAlreadyExists || emailAlreadyExists){
		console.log('username or email already exist');

		return res.json({
			status: 400,
			success: false,
			error: 'That username or email is already taken'
		})

	} else {

	const desiredPassword = body.password
		
	const salt = bcrypt.genSaltSync(10)	

	const hashedPassword = bcrypt.hashSync(desiredPassword, salt)

	const user = new User(body)

	user.password = hashedPassword

	user.streamKey = shortid.generate()

	user.save().then(() => {

		return res.status(201).json({
			status: 201,
			success: true,
			id: user._id,
			message: 'User created!'
		})
	})

}	
	}catch(err){
		console.log(err);
	}
	

	}


loginUser = async (req,res,next) => {
	try {

		const body = req.body.data

		const findUserEmail = await User.findOne({email: body.email})
		const findUserUsername = await User.findOne({username: body.username})

		if(!findUserUsername || !findUserUsername){
			console.log('cant find user?');
			return res.json({
				status: 400,
				success: false,
				error: 'Username or email is invalid'
			})

		}

		const passwordIsValid = bcrypt.compareSync(body.password, findUserUsername.password)	

		if(passwordIsValid){
			console.log('password is valid');
			req.session.loginStatus = true
			req.session.userId = findUserUsername._id
			req.session.username = findUserUsername.username
			req.session.email = findUserUsername.email


			return res.status(200).json({
				status: 200,
				username: req.session.username,
				userId: req.session.userId,
				email: req.session.email,
				success: true,
				message: `Succesfully logged in as ${req.session.username}`
			})
		} else {
			console.log('password is invalid');
			return res.json({
				status: 400,
				success: false,
				error: 'Invalid password'
			})
		}



	}catch(err){
		next(err)
	}

	}


logoutUser = async (req,res,next) => {
	try {

		await req.session.destroy()

		return res.status(200).json({
			data: {},
			success: true,
			status: 200,
			message: 'You are succesfully logged out'
		})

	}catch(err){
		next(err)
	}

	}

getUser = async (req,res,next) => {
	try {	

		const findUser = await User.find({username: req.query.username})

		findUser.password = "********************"
		res.json({
			data: findUser,
			success: true,
			message: 'here is the user info!',
			status: 200
		})

	}catch(err){
		next(err)
	}

	}

getAllUsers = async (req,res,next) => {
	try {

		const findAllUsers = await User.find()

		findAllUsers.forEach((user)=>{
			user.password = '*****************'
		})

		res.json({
			data: findAllUsers,
			success: true,
			message: 'here all the users',
			status: 200
		})

	}catch(err){
		next(err)
	}

	}

// findUserBySearch = async (req,res,next) => {
// 	try {

// 		const query = {$or: []}

// 		req.query.forEach((user) => {
// 			query.$or.push(user)
// 		})

// 		console.log(query);

// 		const getEachUser = await User.find(query)

// 		res.json({
// 			data: getEachUser,
// 			success: true,
// 			message: 'Here is each user',
// 			status: 200
// 		})

// 	}catch(err){
// 		next(err)
// 	}

// 	}	


module.exports = {
	createUserRegister,
	loginUser,
	logoutUser,
	getUser,
	getAllUsers
}
