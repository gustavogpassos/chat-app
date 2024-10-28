const { check } = require('express-validator')
const User = require('../../models/User')

const loginValidator = [
    check('username').notEmpty().withMessage('username is required'),
    check('password').notEmpty().withMessage('password is required')
]

module.exports = loginValidator