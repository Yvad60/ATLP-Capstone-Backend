import { Router } from "express";
const mainRouter = Router();
import blogRouter from "./blog.js";
import usersRouter from "./users.js"
import messagesRouter from "./messages.js"


mainRouter.use('/messages', messagesRouter)
mainRouter.use('/blogs', blogRouter);
mainRouter.use('/users', usersRouter)


const welcomeMessage =
  `
<h1>Welcome to API</h1><br> <hr>
<p>Go to the documentation <a href='#'>Here</a>
`
export const homeRoute = (req, res) => {
  return res.status(200).send(welcomeMessage)
}
export { mainRouter };
