const articleModel = require('../models/blog')

const createNewArticle = (req, res) => {
  const newBlog = new articleModel({
    title: 'Buy the PS4 While You still can',
    author: 'Yvad Titi',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  })
  newBlog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}


const getAllArticles = (req, res) => {
  articleModel.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

const updateArticle = (req, res) => {
  articleModel.findOneAndUpdate(req.params.articleId, { title: 'the new title' })
    .then(() => {
      res.send('article updated successfully')
    })
    .catch((err) => {
      console.log(err)
    })
}


const getSingleArticle = (req, res) => {
  articleModel.findById(req.params.articleId)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

const deleteArticle = () => {
  articleModel.findByIdAndDelete(req.params.articleId)
    .then((result) => {
      if (!result) {
        res.send(`article with id ${req.params.articleId} can't be found`)
      }
      else {
        res.send('article deleted successfully')
      }
    })
}


module.exports = {
  createNewArticle, getAllArticles, deleteArticle, getSingleArticle, updateArticle
}