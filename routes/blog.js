//importing dependecies
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//creating the articles boilerplate
let articles = [
  {
    Id: 1,
    author: 'yvad',
    label: 'gaming',
    title: 'Buy the PS4 while you still can'
  },
  {
    Id: 1,
    label: 'tech',
    author: 'yvad',
    title: 'is the new windows 11 worth it'
  },
  {
    Id: 1,
    author: 'yvad',
    label: 'personal',
    title: 'my ATLP Journey with Andela'
  },
  {
    Id: 1,
    author: 'yvad',
    label: 'tech',
    title: 'which programming language should you learn first'
  }

]

//CRUD operations

//CRUD Read

app.get('/blog', (req, res) => {
  res.send('we are on articles')
})

//CRUD create 
app.post('/blog', (req, res) => {
  console.log('Hello We are on the Blog')
})

// listening to the port 
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`)
})



