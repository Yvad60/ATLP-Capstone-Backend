import { Router } from 'express'
import { registerNewUser } from '../controllers/users.js'

const usersRouter = Router()

usersRouter.get('/register', registerNewUser)



export default usersRouter