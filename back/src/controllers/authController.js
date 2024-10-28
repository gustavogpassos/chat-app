const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) return res.status(400).json({ status: 'error', message: 'User not found' })

        if (bcrypt.compareSync(password, user.password)) {
            user.password = undefined
            const token = jwt.sign({ user }, 'secret')
            return res.json({ status: 'success', data: { user, token } })
        } else {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}