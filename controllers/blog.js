import articleModel from '../models/blog.js'
import { validArticleSchema } from '../validation/validation.js'

const createNewArticle = async (req, res) => {
  const validationErrors = validArticleSchema.validate(req.body).error
  if (validationErrors) {
    return res.status(400).json(handleResponse("fail", 400, { "error": validationErrors.details[0].message }))
  }
  let { title, author, content } = req.body
  try {
    const articleExist = await articleModel.findOne({ title: title })
    if (articleExist) {
      return res.status(409).json(handleResponse("fail",409,{ message: "article title taken" }))
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


const getAllArticles = async (req, res) => {
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

const handleResponse = (statusMessage, code, data) => {
  const response = {
    status: statusMessage,
    statusCode: code,
    response: data
  }
  return response
}

export { createNewArticle, getAllArticles, updateArticle, getSingleArticle, deleteArticle }