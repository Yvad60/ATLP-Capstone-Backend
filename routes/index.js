import { Router } from "express";
const mainRouter = Router();
import blogRouter from "./blog.js";

mainRouter.use('/blogs', blogRouter);
// mainRouter.use('auth/', auth);
// mainRouter.use('/users', usersRouter)

export default mainRouter;
