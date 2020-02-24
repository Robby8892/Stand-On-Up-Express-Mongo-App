const User = require('../models/user.js')



createUser = (req, res) => {
	const body = req.body

	if(!body){
		return res.status(400).json({
			success: false,
			error: 'You must provide user information'
		})
	}

	const user = new User(body)

	if(!user){
		return res.status(400).json({
			success: false,
			error: err
		})
	}

	user.save().then(() => {
		return status(201).json({
			success: true,
			id: user._id,
			message: 'User created!'
		})
	}).catch(err => {
		return res.status({
			error, 
			message: 'User not created'
		})
	})
}



module.exports = {
	createUser
}
