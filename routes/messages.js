import { Router } from "express";
import { createNewMessage, getAllMessages } from "../controllers/messages.js";
import { authenticateAdminUser } from "../middlewares/authentication.js";

const messagesRouter = Router()
messagesRouter.post('/', createNewMessage)
messagesRouter.get('/',authenticateAdminUser,getAllMessages)

export default messagesRouter