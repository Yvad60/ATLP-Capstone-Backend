import mongoose from 'mongoose'
const Schema = mongoose.Schema


const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Article = mongoose.model('Article', articleSchema)

export default Article
