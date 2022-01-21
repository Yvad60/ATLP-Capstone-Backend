import { Router } from 'express'
import { registerNewUser, getAllUsers } from '../controllers/users.js'

const usersRouter = Router()

usersRouter.post('/', registerNewUser)
usersRouter.get('/', getAllUsers)
export default usersRouter