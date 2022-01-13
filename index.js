const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

//ROUTES
app.get('/', (req, res) => {
  res.send('We are on home')
})

app.listen(PORT, () => {
  console.log(`Server running on port https://localhost:${PORT}`);
})
