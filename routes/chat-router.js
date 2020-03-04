const express = require('express')
const cors = require('cors')
const chatController = require('../Controllers/chatController.js')


router = express.Router()

const verifyLoggedIn = require('../lib/verifyLoggedIn.js')


router.post('/chats/new', cors(), chatController.createChat)
router.get('/chats', cors(), chatController.getAllChats)
router.get('/chats/all', cors(), verifyLoggedIn, chatController.getAllUserChats)
router.get('/chats/:id', cors(), chatController.findChatById)
router.delete('/chats/:id', cors(), verifyLoggedIn,  chatController.deleteMyChat)


module.exports = router