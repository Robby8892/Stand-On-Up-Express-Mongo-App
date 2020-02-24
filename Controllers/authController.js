const User = require('../models/user.js')
const bcrypt = require('bcrypt')

createUserRegister = async (req, res) => {
	const body = req.body

	const usernameAlreadyExists = await User.findOne({
		username: req.body.username
	})

	const emailAlreadyExists = await User.findOne({
		email: req.body.email

	})

	if(usernameAlreadyExists){
		return res.status(400).json({
			success: false,
			error: 'That username or email is already taken'
		})

	}	

	if(body.username.length <= 0 || body.email.length <= 0 || body.password.length <= 0){
		return res.status(400).json({
			success: false,
			error: 'You must provide user information'
		})
	}



	const desiredPassword = req.body.password 
		
	const salt = bcrypt.genSaltSync(10)	

	const hashedPassword = bcrypt.hashSync(desiredPassword, salt)

	const user = new User(body)

	user.password = hashedPassword


	user.save().then(() => {
		console.log('get here please');
		return status(201).json({
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



module.exports = {
	createUserRegister
}
