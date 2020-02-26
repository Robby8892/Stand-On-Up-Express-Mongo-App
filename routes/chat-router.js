const express = require('express')

const chatController = require('../Controllers/chatController.js')


router = express.Router()

const verifyLoggedIn = require('../lib/verifyLoggedIn.js')


router.post('/chats/new', verifyLoggedIn, chatController.createChat)



module.exports = router