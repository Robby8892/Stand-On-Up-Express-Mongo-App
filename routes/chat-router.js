const express = require('express')

const chatController = require('../Controllers/chatController.js')


router = express.Router()

const verifyLoggedIn = require('../lib/verifyLoggedIn.js')


router.post('/chats/new', verifyLoggedIn, chatController.createChat)
router.get('/chats', chatController.getAllChats)
router.get('/chats/all', chatController.getAllUserChats)
router.delete('/chats/:id',  chatController.deleteMyChat)


module.exports = router