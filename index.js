import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import connectMongo from './dbConfing.js';
import mainRouter from './routes/index.js';

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use('/api/v1', mainRouter)


app.listen(PORT, () => {
  connectMongo()
  console.log(`the server is running on port ${PORT}`)
})
