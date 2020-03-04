const express = require('express'),
    router = express.Router(),
    User = require('../models/user.js')
    cors = require('cors')


router.get('/info', cors(), (req, res) => {
        if(req.query.streams){
            let streams = JSON.parse(req.query.streams);
            console.log("streams >>> ", streams);
            let query = []


            for (stream in streams) {
            	query.push({key: stream})
            }

            console.log("query", query);


        	query.forEach((streamKey) => {
        		User.find({streamKey: streamKey.key}, (err, users) => {
        			console.log(users);
        			if(err)
        				return res.status(400).json({
        					data: {},
        					success: false,
        					error: 'There was an error, you should not be here!'
        				})
        			if(users) {
        				return res.status(200).json({
        					data: users,
        					messsage: 'Here are all the users',
        					success: true
        				})
        			}
        		})
        	})

        }
    });
 

module.exports = router