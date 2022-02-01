import { Router } from 'express'
import { getAllArticles, getSingleArticle, createNewArticle, deleteArticle, updateArticle } from '../controllers/blog.js';
import { newArticleValidation, updateArticleValidation } from '../middlewares/validation.js';


const blogRouter = Router();


blogRouter.get('/', getAllArticles)

blogRouter.get('/:articleId', getSingleArticle)

blogRouter.post('/', newArticleValidation, createNewArticle)

blogRouter.delete('/:articleId', deleteArticle)

blogRouter.put('/:articleId', updateArticleValidation, updateArticle);

export default blogRouter;