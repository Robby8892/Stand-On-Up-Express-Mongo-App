const express = require('express')

const authController = require('../Controllers/authController.js')



const router = express.Router()

router.post('/auth', authController.createUser)




module.exports = router