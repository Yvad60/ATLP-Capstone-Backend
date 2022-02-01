import articleModel from '../models/blog.js'
import { validArticleSchema } from '../validation/validation.js'
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
    if (articles) {
      return res.status(200).json(articles)
    }
  }
  catch (err) {
    res.status(500).send({
      message: err.message
    })
  }
}

const updateArticle = async (req, res) => {
  const id = req.params.articleId
  console.log(id.length)

  const articleToUpdate = await articleModel.findById(id)
  if (!articleToUpdate || id.length != 24) {
    return res.status(404).json(handleResponse("fail", 404, { message: "Article not found" }));

  } else {
    const validationErrors = validArticleSchema.validate(req.body, { allowUnknown: true }).error
    const updatedArticle = await articleModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(handleResponse("success", 200, updatedArticle))
  }

}


const getSingleArticle = async (req, res) => {
  const id = req.params.articleId
  try {
    const articleExist = await articleModel.findById(id)
    if (articleExist) {
      return res.status(200).json(articleExist)
    }
    else {
      return res.status(400).json({ "message": `article with id ${id} not found` })
    }
  } catch (error) {
    res.status(500).json({ "message": error.message })
  }
}

const deleteArticle = async (req, res) => {
  let id = req.params.articleId
  try {
    const articleFound = await articleModel.findByIdAndDelete(id)
    if (articleFound) {
      res.status(200).json({
        message: `article with id ${id} deleted`
      })
    }
    else {
      res.status(400).json({
        message: `article with id ${id} not found`
      })
    }
  } catch (error) {
    res.status(500).json({
      "message": error.message
    })
  }
}


export { createNewArticle, getAllArticles, updateArticle, getSingleArticle, deleteArticle }