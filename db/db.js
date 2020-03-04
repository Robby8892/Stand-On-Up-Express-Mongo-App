const mongoose = require('mongoose')




mongoose.connect('mongodb://localhost:27017/sou-app', {
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