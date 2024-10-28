const { Router } = require('express')
const UserController = require('../controllers/userController')
const AuthController = require('../controllers/authController')
const createUserValidator = require('../middlewares/validation/createUserValidator')
const validateRequest = require('../middlewares/validateRequest')
const loginValidator = require('../middlewares/validation/loginValidator')
const { auth } = require('../middlewares/auth')

const userRouter = Router()

userRouter.get('/', auth, UserController.all)
// userRouter.get('/:id', UserController.get)
userRouter.post('/login', loginValidator, validateRequest, AuthController.login)
userRouter.post('/', createUserValidator, validateRequest, UserController.create)
userRouter.put('/:id', UserController.update)

module.exports = userRouter