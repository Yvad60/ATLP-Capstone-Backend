import bcrypt from 'bcrypt'
import userModel from '../models/users.js'
import { handleResponse } from './index.js';

const registerNewUser = async (req, res) => {
  let { name, email, password } = req.body
  try {
    const userExist = await userModel.findOne({ email: email })
    if (userExist) {
      return res.status(409).json(handleResponse('fail', 409, { "error": "the email is already in use" }))
    }
    const salt = await bcrypt.genSalt(9)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword
    })
    return res.status(201).json(handleResponse('success', 201, { "name": newUser.name, "email": newUser.email }))
  } catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { error: error.message || "internal server error" }))
  }
}


const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find()
    if (users.length === 0) {
      return res.status(200).json(handleResponse('success', 200, { message: "no users in the database" }))
    }
    return res.status(200).json(handleResponse('success', 200, users))
  }
  catch (error) {
    res.status(500).json(handleResponse('fail', 500, { message: error.message || 'internal server error' }))
  }
}

const getSingleUser = async (req, res) => {
  const id = req.params.userId
  try {
    if (id.length != 24) {
      return res.status(404).json(handleResponse("fail", 404, { message: "user not found" }));
    }
    const userExist = await userModel.findById(id)
    if (!userExist) {
      return res.status(404).json(handleResponse('fail', 404, { message: 'user not found' }))
    }
    return res.status(200).json(handleResponse('success', 200, userExist))
  } catch (error) {
    res.status(500).json(handleResponse('fail', 500, { message: error.message || 'internal server error' }))
  }
}

const deleteUser = async (req, res) => {
  let id = req.params.userId
  try {
    if (id.length != 24) {
      return res.status(404).json(handleResponse('fail', 404, { message: "user not found" }));
    }
    const userExist = await userModel.findByIdAndDelete(id)
    if (!userExist) {
      return res.status(404).json(handleResponse('fail', 404, { message: "user not found" }))
    }
    return res.status(200).json(handleResponse('success', 200, { message: "user deleted" }))
  }
  catch (error) {
    return res.status(500).json(handleResponse('fail', 500, { message: error.message || 'internal server error' }))
  }
}

const loginUser = async (req, res) => {
  let { email, password } = req.body
  try {
    const userExist = await userModel.findOne({ email: email })
    if (!userExist) {
      return res.status(404).json({ "error": "invalid credentials" })
    }
    const passwordMatches = bcrypt.compare(password, userExist.password)
    if (!passwordMatches) {
      return res.status(404).json({ "error": "invalid credentials" })
    }
    return res.status(200).json({ "message": "logged in" })
  } catch (error) {
    return res.status(500).json({ "error": "error occured" })
  }
}




export { registerNewUser, getAllUsers, getSingleUser, deleteUser, loginUser }