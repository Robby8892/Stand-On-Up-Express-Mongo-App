const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const session = require('express-session')


createUserRegister = async (req, res) => {

	const body = req.body

	const usernameAlreadyExists = await User.findOne({username: req.body.username})

	const emailAlreadyExists = await User.findOne({email: req.body.email})

	if(body.username.length <= 0 || body.email.length <= 0 || body.password.length <= 0){
		return res.status(400).json({
			success: false,
			error: 'You must provide user information'
		})
	}

	if(usernameAlreadyExists || emailAlreadyExists){
		return res.status(400).json({
			success: false,
			error: 'That username or email is already taken'
		})

	}	

	const desiredPassword = req.body.password 
		
	const salt = bcrypt.genSaltSync(10)	

	const hashedPassword = bcrypt.hashSync(desiredPassword, salt)

	const user = new User(body)

	user.password = hashedPassword


	user.save().then(() => {

		return res.status(201).json({
			success: true,
			id: user._id,
			message: 'User created!'
		})
	}).catch(err => {
		return res.status({
			error: err, 
			message: 'User not created'
		})
	})
	

	}


loginUser = async (req,res,next) => {
	try {

		const findUserEmail = await User.findOne({email: req.body.email})
		const findUserUsername = await User.findOne({username: req.body.username})

		if(!findUserUsername || !findUserUsername){
			return req.status(400).json({
				success: false,
				message: 'Username or email is invalid'
			})

		}

		const passwordIsValid = bcrypt.compareSync(req.body.password, findUserEmail.password)	

		if(passwordIsValid){
			req.session.loginStatus = true
			req.session.userId = findUserEmail._id
			req.session.username = findUserEmail.username

			return res.status(201).json({
				success: true,
				message: `Succesfully logged in as ${req.session.username}`
			})
		} else {
			return res.status(400).json({
				success: false,
				message: 'Invalid password'
			})
		}



	}catch(err){
		next(err)
	}

	}




module.exports = {
	createUserRegister,
	loginUser
}
