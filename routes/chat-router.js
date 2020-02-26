const express = require('express')

const chatController = require('../Controllers/chatController.js')


router = express.Router()


router.post('/chats/new', chatController.createChat)



module.exports = router