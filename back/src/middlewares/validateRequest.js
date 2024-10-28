const { validationResult } = require('express-validator')

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({status: 'error', data: errors.array({onlyFirstError: true}) })
    }
    next()
}

module.exports = validateRequest