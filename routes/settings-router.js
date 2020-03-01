const express = require('express'),
    router = express.Router(),
    User = require('../models/user.js')
    shortid = require('shortid')
    session = require('express-session')


router.get('/streamKey', 
	(req, res) => {
		console.log(req.query, 'here is req.query');

		User.findOne({email: req.query.data}, (err, user) => {
			if(!err) {
				// console.log(user);
				// console.log(user.streamKey);
				res.status(200).json({
					success: true,
					message: "Here is your stream key",
					streamKey: user.streamKey

				})
			}
		})
	})


router.put('/streamKey', 
	(req,res) => {

		User.findOneAndUpdate({email: req.session.email}, {streamKey: shortid.generate()}, 
			(err, user) => {
			if(!err) {
				res.status(200).json({
					success: true,
					message: "Here is your new stream key",
					streamKey: user.streamKey
				})
			}
		})
	})	    

module.exports = router