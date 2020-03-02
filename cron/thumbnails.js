const CronJob = require('cron').CronJob
const request = require('request')
const helpers = require('../helpers/helpers')
const config = require('../server/config/default').rtmp_server

const port = config.http.port



const job = new CronJob('*/5 * * * * *', () => {
	request.get('http://127.0.0.1:' + port + '/api/streams', 
		(err, res, body) => {

			let streams = JSON.parse(body)


			if(typeof(streams['live'] !== undefined)) {
				let live_streams = streams['live']
				for(let stream in live_streams) {
					if(!live_streams.hasOwnProperty(stream)) continue
						helpers.generateStreamThumbnail(stream)
				}
			} else {
				console.log('here is the err', err);
			}
	});
}, null, true)

module.exports = job