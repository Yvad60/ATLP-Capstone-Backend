const blog = require('./routes/blog')

//impporting dependecies
const express = require('express')
const connectMongo = require('./dbConfing')
const app = express()
const PORT = process.env.PORT || 5000

app.use(blog)
// starting the server on the port 
app.listen(PORT, () => {
  connectMongo()
  console.log(`the server is running on port ${PORT}`)
})
