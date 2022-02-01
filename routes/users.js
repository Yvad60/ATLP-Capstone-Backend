import { Router } from 'express'
import { registerNewUser, getAllUsers, loginUser, } from '../controllers/users.js';

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.post('/', registerNewUser)
usersRouter.post('/login', (req, res, next) => {
  validLoginSchema.validate(req.body), loginUser
})
export default usersRouter