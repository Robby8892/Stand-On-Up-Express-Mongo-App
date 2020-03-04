require('dotenv').config()
require('./db/db.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const config = require('./server/config/default')
const flash = require('connect-flash')



const port = process.env.STREAM_PORT
const node_media_server = require('./server/media_server.js')
const thumbnail_generator = require('./cron/thumbnails')

apiPort = process.env.PORT

// My middleware
//======================================================


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
	cookie: {
		secure: true,
		maxAge: 6 * 60 * 1000 * 30
	}
}))




//======================================================




// Routes for api's  
//======================================================

const authRouter = require('./routes/auth-router.js')
const chatRouter = require('./routes/chat-router.js')
const streamRouter = require('./routes/stream-router.js')
const settingsRouter = require('./routes/settings-router.js')

//======================================================


app.use((req,res,next) =>{
	if(req.session.loginStatus){
		res.locals.loginStatus = req.session.loginStatus
		res.locals.userId = req.session.userId
		res.locals.username = req.session.username 								 

	}else {
		res.locals.loginStatus = false
		res.locals.userId = false
		res.locals.username = false
	}
	next()
})




// Socket io connection to front end for chats 
//======================================================
io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});



io.listen(process.env.SOCKET_PORT)
//======================================================




app.get('/', (req,res)=>{

	res.send('Test route works')
})

// Api routes being used
//======================================================
app.use('/api/v1', authRouter)
app.use('/api/v1', chatRouter)
app.use('/api/v1/streams', streamRouter)
app.use('/api/v1/settings', settingsRouter)
//======================================================



app.listen(port || 3333, ()=>{
	console.log(`Sever is running on ${port}`);
})
// Used to connect to the third party app for media streaming

node_media_server.run()
thumbnail_generator.start()


