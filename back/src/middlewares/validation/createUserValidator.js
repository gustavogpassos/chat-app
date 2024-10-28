const { check } = require('express-validator')
const User = require('../../models/User')

const createUserValidator = [
    check('username').custom(async (username) => {
        console.log(username)
        if(!username) return Promise.reject('username is required')
        const user = await User.findOne({ username: username })
        if(user) return Promise.reject('username already in use')
    }),
    check('password').isLength({ min: 8 }).withMessage('password must have al least 8 characters'),
    check('name').isLength({ min: 3 }).withMessage('name must have at least 3 characters'),
]

module.exports = createUserValidator
