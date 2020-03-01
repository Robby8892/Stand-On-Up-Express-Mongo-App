const express = require('express'),
    router = express.Router(),
    User = require('../models/user.js')
    shortid = require('shortid')
    session = require('express-session')


router.get('/streamKey', 
	(req, res) => {

		User.findOne({email: req.query.data}, (err, user) => {
			if(!err) {
				res.status(200).json({
					success: true,
					message: "Here is your stream key",
					streamKey: user.streamKey

				})
			}
		})
	})


router.put('/streamKey', async(req,res, next) => {
	try{

		const updatedUser = await User.findOneAndUpdate({email: req.body.data}, {streamKey: shortid.generate()})

		res.status(200).json({
			success: true,
			message: "Here is your new stream key",
			streamKey: updatedUser.streamKey
		})

	}catch(err){
		next(err)
	}
	})

module.exports = router