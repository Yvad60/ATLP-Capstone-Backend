const mongoose = require("mongoose")

//setting up the schema for the user 
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: ""
  }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)