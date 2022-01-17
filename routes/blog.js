const express = require('express')
const app = module.exports = express()
const blog = require('../controllers/blog')

app.get('/blog', blog.getAllArticles)

app.get('/blog/:articleId', blog.getSingleArticle)

app.post('/blog/add', blog.createNewArticle)

app.delete('/blog/delete/:articleId', blog.deleteArticle)

app.put('/blog/update/:articleId', blog.updateArticle)