const User = require('../models/user.js')



createUser = (req, res) => {
	const body = req.body

	let test = {...body}
	console.log({...body} === '' );


	if(body.username.length <= 0 || body.email.length <= 0 || body.password.length <= 0){
		return res.status(400).json({
			success: false,
			error: 'You must provide user information'
		})
	}

	const user = new User(body)

	if(user.username.length <= 0 || user.email.length <= 0 || user.password.length <= 0){
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
			error: err, 
			message: 'User not created'
		})
	})
	res.send("sup!")
}



module.exports = {
	createUser
}
