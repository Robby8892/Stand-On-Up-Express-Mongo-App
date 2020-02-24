const express = require('express')

const authController = require('../Controllers/authController.js')



const router = express.Router()

router.post('/auth/register', authController.createUserRegister)


module.exports = router