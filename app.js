require('dotenv').config()
require('./db/db.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const session = require('express-session')
const middleware = require('connect-ensure-login')
const fileStore = require('session-file-store')(session)
const config = require('./server/config/default')
const flash = require('connect-flash')



const port = config.server.port
const node_media_server = require('./server/media_server.js')


apiPort = process.env.PORT

app.use(bodyParser.urlencoded({ 
	extended: false 
}))

app.use(flash())

app.use(bodyParser.json())

app.use(cors())



app.use(session ({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new fileStore({
		path: '.server/sessions'
	}),
	maxAge: Date().now + (60 * 1000 * 30)
}))




// Routes for api's  
//======================================================

const authRouter = require('./routes/auth-router.js')

//======================================================



// io.on('connection', (socket) => {
// 	console.log('User has connected');
// 	console.log(socket.id);

// 	socket.on('disconnect', (msg)=>{
// 		console.log('User has disconnected');
// 	})

// 	socket.on('SEND_MESSAGE', (data)=>{
// 		io.emit('RECIEVE_MESSAGE', data)
// 		// console.log('message is here ' + msg.message);
// 	})

// 	socket.emit('test_message', 'Did you get me?')

// 	socket.on('example_message', (msg) => {
// 		console.log('message is here ' + msg.message);

// 	})

// socket.on

// })

// io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});



io.listen(8000)

console.log(io);

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

// 


app.get('/', (req,res)=>{

	res.send('Test route works')
})


app.use('/api/v1', authRouter)

app.listen(port, ()=>{
	console.log(`Sever is running on ${port}`);
})
node_media_server.run()