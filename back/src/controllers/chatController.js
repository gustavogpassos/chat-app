const Chat = require('../models/Chat')

exports.all = async (req, res) => {
    try {
        const { user } = req
        const chats = await Chat.find({ users: { $in: [user._id] } }).populate('users')
        return res.status(200).json({ status: 'success', data: chats })
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message })
    }
}

// exports.create = async (req, res) => {
//     const chat = new Chat({
//         users: req.body.users,
//         messages: req.body.messages
//     })
//     try {
//         const newChat = await chat.save()
//         res.status(201).json(newChat)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

exports.saveMessage = async ({ sender, message, chatId }) => {
    const chat = await Chat.findById(chatId)
    chat.messages.push({ sender, message, date: new Date() })
    await chat.save()
}

exports.getChat = async ({ sender, receiver }) => {
    try {
        var chat = await Chat.findOne({ users: { $all: [sender, receiver] } }).populate('users')
        if (chat) {
            return chat
        }
        chat = await Chat.create({ users: [sender, receiver] })
        return chat
    } catch (error) {
        console.log(error)
        return false
    }
}