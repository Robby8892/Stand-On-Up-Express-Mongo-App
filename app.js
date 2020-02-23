require('dotenv').config()
require('./db/db.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)


PORT = process.env.PORT

server.listen(80)

// console.log(server);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket) {
	socket.emit('news', {hello: 'World'})
	socket.on('my other event', function(data) {
		console.log('here is my data on app.js', data);
	})
})


app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())







app.listen(PORT, ()=>{
	console.log(`Sever is running on ${PORT}`);
})