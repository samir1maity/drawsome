import { Router } from 'express'
import { login, signup } from '../controllers/user.controller'

const userRouter: Router = Router()

userRouter.post('/signin', login)
userRouter.post('/signup', signup)

export default userRouter