import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  names: {
    type: String,
    required: true,
    minLength: [5, 'name shoulbe be 5 characters or more']
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })

const messageModel = mongoose.model('Message', messageSchema)

export { messageModel }