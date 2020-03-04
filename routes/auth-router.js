const express = require('express')
const cors = require('cors')
const authController = require('../Controllers/authController.js')


const router = express.Router()

router.post('/auth/register', cors(), authController.createUserRegister)
router.post('/auth/login', cors(), authController.loginUser )
router.get('/auth/logoutUser', cors(), authController.logoutUser )
router.get('/auth', cors(), authController.getUser)
router.get('/allUsers', cors(), authController.getAllUsers)
// router.get('/:id', authController.findUserBySearch)


module.exports = router