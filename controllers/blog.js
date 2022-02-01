import articleModel from '../models/blog.js'
import { handleResponse } from './index.js'

const createNewArticle = async (req, res) => {
  let { title, author, content } = req.body
  try {
    const articleExist = await articleModel.findOne({ title: title })
    if (articleExist) {
      return res.status(409).json(handleResponse("fail", 409, { error: "article title is taken" }))
    }
    const newArticle = await articleModel.create({
      title: title,
      author: author,
      content: content,
    })
    return res.status(201).json(handleResponse('success', 201, newArticle))
  } catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { message: error.message }))
  }
}

const getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.find()
    if (articles.length === 0) {
      return res.status(200).json(handleResponse('success', 200, { message: "no articles in the database" }))
    }
    return res.status(200).json(handleResponse('success', 200, articles))
  } catch (error) {
    res.status(500).json(handleResponse('fail', 500, { message: error.message || 'internal server error' }))
  }
}

const updateArticle = async (req, res) => {
  const id = req.params.articleId
  try {
    if (id.length != 24) {
      return res.status(404).json(handleResponse("fail", 404, { message: "article not found" }));
    }
    const articleToUpdate = await articleModel.findById(id)
    if (!articleToUpdate) {
      return res.status(404).json(handleResponse("fail", 404, { message: "article not found" }));
    }
    const updatedArticle = await articleModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(handleResponse("success", 200, updatedArticle))
  } catch (error) {
    res.status(500).json(handleResponse('fail', 500, { message: error.message || 'internal server error' }))
  }
}

const getSingleArticle = async (req, res) => {
  const id = req.params.articleId
  try {
    if (id.length != 24) {
      return res.status(404).json(handleResponse("fail", 404, { message: "article not found" }));
    }
    const articleExist = await articleModel.findById(id)
    if (!articleExist) {
      return res.status(404).json(handleResponse('fail', 404, { message: 'article with not found' }))
    }
    return res.status(200).json(handleResponse('fail', 200, articleExist))
  } catch (error) {
    res.status(500).json(handleResponse('fail', 500, { message: error.message || 'internal server error' }))
  }
}

const deleteArticle = async (req, res) => {
  let id = req.params.articleId
  try {
    if (id.length != 24) {
      return res.status(404).json(handleResponse('fail', 404, { message: "article not found" }));
    }
    const articleFound = await articleModel.findByIdAndDelete(id)
    if (!articleFound) {
      return res.status(404).json(handleResponse('fail', 404, { message: "article not found" }))
    }
    return res.status(200).json(handleResponse('success', 200, { message: "article deleted" }))
  }
  catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { message: error.message || 'internal server error' }))
  }
}
export { createNewArticle, getAllArticles, updateArticle, getSingleArticle, deleteArticle }