const mongoose = require('mongoose')
const Schema = mongoose.Schema

const defSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        message: String,
        dateSent: Date
    }]
})

module.exports = mongoose.model('Chat', defSchema)