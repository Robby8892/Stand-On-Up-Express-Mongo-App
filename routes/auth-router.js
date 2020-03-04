const express = require('express')
const authController = require('../Controllers/authController.js')


const router = express.Router()

router.post('/auth/register', authController.createUserRegister)
router.post('/auth/login', authController.loginUser )
router.get('/auth/logoutUser', authController.logoutUser )
router.get('/auth', authController.getUser)
router.get('/allUsers', authController.getAllUsers)
// router.get('/:id', authController.findUserBySearch)


module.exports = router