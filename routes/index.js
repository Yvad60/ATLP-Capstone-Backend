import { Router } from "express";
const mainRouter = Router();
import blogRouter from "./blog.js";

mainRouter.use('/blogs', blogRouter);
const welcomeMessage =
  `
<h1>Welcome to API</h1><br> <hr>
<p>Go to the documentation <a href='#'>Here</a>
`
export const homeRoute = async (req, res) => {
  return res.status(200).send(welcomeMessage)
}
export { mainRouter };
