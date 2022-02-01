import { Router } from 'express'
import { registerNewUser, getAllUsers, getSingleUser, loginUser, deleteUser, } from '../controllers/users.js';
import { newUserValidation } from '../middlewares/validation.js';

const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:userId', getSingleUser)
usersRouter.delete('/:userId', deleteUser)
usersRouter.post('/', newUserValidation, registerNewUser)

// usersRouter.post('/login', (req, res, next) => {
//   validLoginSchema.validate(req.body), loginUser
// })
export default usersRouter