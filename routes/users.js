import { Router } from 'express'
import { registerNewUser } from '../controllers/users.js'

const usersRouter = Router()

usersRouter.post('/', registerNewUser)



export default usersRouter