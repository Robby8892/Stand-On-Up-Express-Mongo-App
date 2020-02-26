

module.exports = (req,res,next) => {

	if(!req.session.loginStatus){
		console.log('here is req.session in custom middleware');
		console.log(req.session.loginStatus);
		res.status(400).json({
			success: false,
			error: 'You must be logged in to do that'
		})
	} else {
		next()
	}
}