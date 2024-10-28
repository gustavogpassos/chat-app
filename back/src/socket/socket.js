const socket = require('socket.io')
const ChatController = require('../controllers/chatController')

var users = []

module.exports = (server) => {
    const io = socket(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })
    io.on('connect', (socket) => {
        // users.push(socket.id)
        // socket.emit('users', users)
        // console.log(socket)
        console.log('a user connected')
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })

        socket.on('join server', ({ user }) => {
            console.log('user joined: ',user)
            const { username, name, _id } = user
            if (!users.find(user => user.userId === _id)) {
                const newUser = {
                    username,
                    name,
                    userId: _id,
                    id: socket.id
                }
                users.push(newUser)
            }
            io.emit('new user', users)
        })

        socket.on('join chat', async ({ sender, receiver, chatId }) => {
            const chat = await ChatController.getChat({ chatId, sender, receiver })
            if (!chat) {
                socket.emit('error', 'join failed')
            } else {
                socket.emit('chat joined', chat)
            }
        })

        socket.on('send message', ({chatId, sender, message }) => {
            console.log('message: ' + message)
            socket.to(chatId).emit('new message', { chatId, sender })
            ChatController.saveMessage({ chatId, sender, message })
        })
    })
}

