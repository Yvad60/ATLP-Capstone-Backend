import { Router } from "express";
const mainRouter = Router();
import blogRouter from "./blog.js";

mainRouter.use('/blogs', blogRouter);
// mainRouter.use('auth/', auth);
// mainRouter.use('/users', usersRouter)
const welcomeMessage =
  `
<head>
<title>Home</title>
<style>
body {
  display :flex;
  text-align: center;
  align-items: center;
  color:black;
  justify-content: center;
  flex-direction: column


}
</style>
</head>
<h1>Welcome home</h1><br> <hr>
<h3>I am Ivad</h3> <br> <hr>
<p>Go to the docs <a href='/docs'>Here</a>
`
export const homeRoute = async (req, res) => {
  return res.status(200).send(welcomeMessage)
}
export { mainRouter };
