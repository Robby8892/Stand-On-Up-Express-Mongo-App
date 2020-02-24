require('dotenv').config()
require('./db/db.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server)


apiPort = process.env.PORT

app.use(bodyParser.urlencoded({ 
	extended: true 
}))

app.use(bodyParser.json())

app.use(cors())

const authRouter = require('./routes/auth-router.js')


// server.listen(80)

// app.get('/', function(req, res) {
// 	res.sendFile(__dirname + '/index.html')
// })

// io.on('connection', function(socket) {
// 	socket.emit('news', {hello: 'World'})
// 	socket.on('my other event', function(data) {
// 		console.log('here is my data on app.js', data);
// 	})
// })

// io.on('connection', (socket)=>{
// 	io.emit('this', {will: 'be received by everyone'});

// 	socket.on('private message', (frm, msg) => {
// 		console.log(`I have received a private message by, ${frm}, saying, ${msg}`);
// 	})

// 	socket.on('disconnect', ()=>{
// 		io.emit('user disconnected')
// 	})
// })



app.get('/', (req,res)=>{
	res.send('Test route works')
})



app.use('/api', authRouter)



app.listen(apiPort, ()=>{
	console.log(`Sever is running on ${apiPort}`);
})