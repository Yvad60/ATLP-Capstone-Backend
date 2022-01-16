//importing dependecies
const mongoose = require('mongoose')

//setting up the Mongo URL to connect to
const username = 'Yvad60'
const password = 'yvad6060'
const MONGO_URL = `mongodb+srv://${username}:${password}@cluster0.kp6aj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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
module.exports = connectMongo