import articleModel from '../models/blog.js'
import { validArticleSchema } from '../validation/validation.js'

export const createNewArticle = async (req, res) => {
  const validationErrors = validArticleSchema.validate(req.body).error
  if (validationErrors) {
    return res.status(400).json({ "error": validationErrors.details[0].message })
  }
  let { title, author, content } = req.body
  try {
    const articleExist = await articleModel.findOne({ title: title })
    if (articleExist) {
      return res.status(409).json({ message: "article title taken" })
    }
    const newBlog = await articleModel.create({
      author: author,
      content: content,
      title: title
    })
    if (newBlog != {}) {
      return res.status(200).json(newBlog)
    }
  } catch (error) {
    return res.send(error)
  }
}


export const getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.find()
    return res.status(200).json(articles)
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Error occured while getting articles"
    })
  }
}

export const updateArticle = async (req, res) => {
  try {
    const articleToUpdate = await articleModel.findOneAndUpdate(req.params.articleId, req.body, { returnNewDocument: true });
    if (!articleToUpdate) {
      res.status(404).json({ message: "Article not found" });
    } else {
      res.status(200).json({ status: "OK", message: "article updated" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getSingleArticle = async (req, res) => {
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

export const deleteArticle = async (req, res) => {
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