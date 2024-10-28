const { Router } = require('express')
const userRouter = require('./userRoutes')
const chatRouter = require('./chatRouter')

const router = Router()

router.get('/', (req, res) => {
    return res.send('hello world2')
})

router.use('/users', userRouter)
router.use('/chats', chatRouter)
module.exports = router