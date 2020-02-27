const NodeMediaSever = require('node-media-server')
const User = require('../models/user.js')
const config = require('./config/default.js').rtmp_server

nms = new NodeMediaSever(config)



nms.on('prePublish', async (id, StreamPath, args) => {

	let streamKey = getStreamKeyFromStreamPath(StreamPath)


	console.log('[NodeEvent on prePublish]', 
	`id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

	const foundUser = await User.findOne({streamKey: streamKey}, (err, user) =>{


		if(!err){
			if(!user){

				let session = nms.getSession(id)
				session.reject()

			} else {



			}
		}
	})


})



const getStreamKeyFromStreamPath = (path) => {

	let parts = path.split('/')
	return parts[parts.length - 1]
}






module.exports = nms