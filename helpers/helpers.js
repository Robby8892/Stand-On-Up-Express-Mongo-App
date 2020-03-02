const spawn = require('child_process').spawn
const config = require('./sever/config/default')
const cmd = config.rtmp_sever.trans.ffmpeg

const generateStreamThumbnail = (streamKey) => {
	const args = [
		'-y',
		'-i,' 'http://127.0.0.1:8888/live/'+ streamKey +'/index.m3u8',
		'-ss', '00:00:01',
		'-vframes', '1',
		'-vf', 'scale=-2:300',
		'sever/thumbnails/' + streamKey + '.png' 		
	];

	spawn(cmd, args, {
		detached: true,
		stdio: 'ignore'
	}).unref()
};


module.exports = {
	generateStreamThumbnail: generateStreamThumbnail
};