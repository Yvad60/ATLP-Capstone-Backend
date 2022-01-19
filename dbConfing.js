//importing dependecies
import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

const MONGO_URL = process.env.MONGODB_URL

// connecting to the MongoDB database 
const connectMongo = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to the database!");

  }).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
}

//export the connectMongo function
export default connectMongo