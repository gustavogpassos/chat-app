const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const chatController = require('../controllers/chatController')
const chatRouter = Router()

chatRouter.get('/', auth, chatController.all)
// chatRouter.post('/', auth, chatController.create)

module.exports = chatRouter