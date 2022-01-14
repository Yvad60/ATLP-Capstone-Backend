// importing dependecies
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

dotenv.config()

app.get('/', (req, res) => {
  res.send('We are on home')
})

mongoose.connect(process.env.MONGODB_URL)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
