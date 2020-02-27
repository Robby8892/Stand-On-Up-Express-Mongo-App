const NodeMediaSever = require('node-media-server')
const config = require('./config/default.js').rtmp_server

nms = new NodeMediaSever(config)



nms.on('prePublish', async (id, StreamPath, args) => {
	let streamKey = getStreamKeyFromStreamPath(StreamPath)
	"heyyyyyyyyyyyyy"
	console.log(streamKey);
	console.log('[NodeEvent on prePublish]', 
		`id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
})



const getStreamKeyFromStreamPath = (path) => {
	let parts = path.split('/')
	return parts[parts.length - 1]
}


console.log("nms > ",nms);



module.exports = nms