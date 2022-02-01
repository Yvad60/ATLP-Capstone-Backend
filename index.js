import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import connectMongo from './dbConfing.js';
import { mainRouter, homeRoute } from './routes/index.js';

const PORT = process.env.PORT || 5000
const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/v1', mainRouter)
app.get("/", homeRoute)


app.listen(PORT, () => {
  connectMongo()
  console.log(`the server is running on port ${PORT}`)
})

export { app }
