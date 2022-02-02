import { Router } from 'express'
import { getAllArticles, getSingleArticle, createNewArticle, deleteArticle, updateArticle } from '../controllers/blog.js';
import { authenticateAdminUser } from '../middlewares/authentication.js';
import { newArticleValidation, updateArticleValidation } from '../middlewares/validation.js';


const blogRouter = Router();
blogRouter.get('/', getAllArticles)

blogRouter.get('/:articleId', getSingleArticle)

blogRouter.post('/', authenticateAdminUser, newArticleValidation, createNewArticle)

blogRouter.delete('/:articleId', authenticateAdminUser, deleteArticle)

blogRouter.put('/:articleId', authenticateAdminUser, updateArticleValidation, updateArticle);

export default blogRouter;