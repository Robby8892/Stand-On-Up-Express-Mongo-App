const express = require('express')

const authController = require('../Controllers/authController.js')



const router = express.Router()

router.post('/auth/register', authController.createUserRegister)
router.post('/auth/login', authController.loginUser )
router.get('/auth/logoutUser', authController.logoutUser )


module.exports = router