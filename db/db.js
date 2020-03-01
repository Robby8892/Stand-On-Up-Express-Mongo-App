const mongoose = require('mongoose')

const mongodbURI = process.env.MONGODB_URI


mongoose.connect(mongodbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

mongoose.connection.on('connected', () => {
	console.log('You\'re connected to the db' );
})

mongoose.connection.on('disconnected', () => {
	console.log('You\'re disconnected from the db' );	
})

mongoose.connection.on('error', (error) => {
	console.log('Here is the error with the db');
	console.log(error);
})