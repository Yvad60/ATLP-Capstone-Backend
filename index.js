// importing dependecies
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
dotenv.config();

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



//get request
app.get('/', (req, res) => {
  res.send('Hello We are on home');
})

app.get('/articles', (req, res) => {
  res.send(articles)
})

mongoose.connect(process.env.MONGODB_URL)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
})

