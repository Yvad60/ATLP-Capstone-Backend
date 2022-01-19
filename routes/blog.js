import { Router } from 'express'
import {
  getAllArticles, getSingleArticle, createNewArticle, deleteArticle, updateArticle
} from '../controllers/blog.js'

const blogRouter = Router();


blogRouter.get('/', getAllArticles)

blogRouter.get('/:articleId', getSingleArticle)

blogRouter.post('/', createNewArticle)

blogRouter.delete('/:articleId', deleteArticle)

blogRouter.put('/:articleId', updateArticle);

export default blogRouter;