const mongoose = require('mongoose')
const Schema = mongoose.Schema

const defSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
})

module.exports = mongoose.model('User', defSchema)