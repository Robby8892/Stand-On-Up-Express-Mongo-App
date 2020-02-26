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
	maxAge: Date().now + (60 * 1000 * 30)
}))

app.use((req,res,next) =>{
	if(req.session.loginStatus){
		res.locals.loginStatus = req.session.loginStatus
		req.locals.userId = req.session.userId
		req.locals.username = req.session.username 								 

	}else {
		res.locals.loginStatus = false
		req.locals.userId = false
		req.locals.username = false
	}
	next()
})


//======================================================




// Routes for api's  
//======================================================

const authRouter = require('./routes/auth-router.js')
const chatRouter = require('./routes/chat-router.js')

//======================================================



// Socket io connection to front end for chats 
//======================================================
io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});



io.listen(8000)
//======================================================




app.get('/', (req,res)=>{

	res.send('Test route works')
})

// Api routes being used
//======================================================
app.use('/api/v1', authRouter)
app.use('/api/v1', chatRouter)
//======================================================

app.listen(port, ()=>{
	console.log(`Sever is running on ${port}`);
})
// Used to connect to the third party app for media streaming
node_media_server.run()