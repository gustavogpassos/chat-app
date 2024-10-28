const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
const router = require('./routes/router')
const http = require('http')
const { Server } = require('socket.io')

const app = express()

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//     }
// })

// io.on('connection', (socket) => {
//     console.log('a user connected')
//     socket.on('disconnect', () => {
//         console.log('user disconnected')
//     })

//     socket.on('message', (msg) => {
//         console.log('message: ' + msg)
//         io.emit('message', msg)
//     })
// })

require('./socket/socket')(server)
// app.listen(5000, () => console.log('server is running'))


server.listen(5000, () => console.log('server is running'))