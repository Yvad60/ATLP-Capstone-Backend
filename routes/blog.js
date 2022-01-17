const articleModel = require('../models/blog')
const express = require('express')
const app = module.exports = express()
const bodyParser = require('body-parser')


// Read for the blog CRUD operation 
//on the articles page list all article
app.get('/blog', (req, res) => {
  articleModel.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

//Delete  for the CRUD operation
//delete the article by it's id
app.delete('/blog/delete/:articleId', (req, res) => {
  articleModel.findByIdAndDelete(req.params.articleId)
    .then((result) => {
      if (!result) {
        res.send(`article with id ${req.params.articleId} can't be found`)
      }
      else {
        res.send('article deleted successfully')
      }
    })
})


app.put('/blog/update/:articleId', (req, res) => {
  //findByIdAndUpdate()
})


//Create for the CRUD operation 
//create a new article based on the schema
app.post('/blog/add', (req, res) => {
  const newBlog = new articleModel({
    title: 'Buy the PS4 While You still can',
    author: 'Yvad jean',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  })
  newBlog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

