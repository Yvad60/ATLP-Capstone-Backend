import { messageModel } from "../models/mesages.js";

const createNewMessage = async (req, res) => {
  let { names, email, message } = req.body
  try {
    const newMessage = await messageModel.create({
      names: names,
      email: email,
      message: message
    })
    if (newMessage) {
      return res.status(201).json(handleResponse('success', 201, newMessage))
    }
  } catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { message: error.message }))
  }
}

const getAllMessages = async (req, res) => {
  const messages = await messageModel.find()
  try {
    if (messages) {
      return res.status(200).json(messages)
    }
    else {
      return res.status(404).json(handleResponse('fail', 404, { message: 'no messages found' }))
    }
  } catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { message: 'error on our servers' }))
  }

}

const handleResponse = (statusMessage, code, data) => {
  const response = {
    status: statusMessage,
    statusCode: code,
    response: data
  }
  return response
}

export { createNewMessage, getAllMessages }
