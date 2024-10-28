const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.all = async (req, res) => {
    try {
        const { user } = req
        const users = await User.find({ _id: { $ne: user._id } }).select({ password: 0 })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).select({ password: 0 })
        return res.status(200).json({ status: 'success', data: user })
    } catch (error) {
        return res.status(500).json({ status: 'error', data: error.message })
    }
}

exports.create = async (req, res) => {
    try {
        var { username, name, password } = req.body
        password = await bcrypt.hash(password, 10)
        await User.create({ username, name, password })
        return res.status(201).json({ status: 'success', data: 'User created' })
    } catch (error) {
        return res.status(500).json({ status: 'error', data: error.message })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select({ password: 0 })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

