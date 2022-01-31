import { Router } from "express";
import { createNewMessage, getAllMessages } from "../controllers/messages.js";

const messagesRouter = Router()
messagesRouter.post('/', createNewMessage)
messagesRouter.get('/', getAllMessages)

export default messagesRouter