const express = require('express'),
    router = express.Router(),
    User = require('../models/user.js')


router.get('/info', (req, res) => {
        if(req.query.streams){
            let streams = JSON.parse(req.query.streams);
            console.log("streams >>> ", streams);
            let query = []


            for (stream in streams) {
            	query.push({key: stream})
            }
            // let query = {$or: []};
            console.log("query", query);

            // for (let stream in streams) {
            //     if (streams.hasOwnProperty(stream)) continue;
            //     console.log(stream, '___stream___');
            //     query.$or.push({streamKey : stream});
            // }
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


            	// User.find({$or: query}, (err, users) => {

            	// 	if(err) 
            	// 		return res.status(400)
            	// })

            // User.find(query,(err, users) => {
            //     if (err)
            //         return res.status(400).json({success: false, error: 'failed to get data'});
            //     if (users) {
            //         return res.status(200).json({
            //         	data: users,
            //         	success: true,
            //         })
            //     }
            // });
        }
    });
 

module.exports = router