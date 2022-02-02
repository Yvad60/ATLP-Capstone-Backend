import { Router } from 'express'
import { registerNewUser, getAllUsers, getSingleUser, loginUser, deleteUser, } from '../controllers/users.js';
import { newUserValidation, loginValidation } from '../middlewares/validation.js';
import { authenticateAdminUser } from '../middlewares/authentication.js';

const usersRouter = Router()
usersRouter.get('/', authenticateAdminUser, getAllUsers)
usersRouter.get('/:userId', getSingleUser)
usersRouter.delete('/:userId', authenticateAdminUser, deleteUser)
usersRouter.post('/', newUserValidation, registerNewUser)
usersRouter.post('/login', loginValidation, loginUser)
export default usersRouter