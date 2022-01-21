import bcrypt from 'bcrypt'
import userModel from '../models/users.js'
import { validUserSchema } from '../validation/validation.js'

export const registerNewUser = async (req, res) => {
  const validationErrors = validUserSchema.validate(req.body).error
  if (validationErrors) {
    return res.status(400).json({ "error": validationErrors.details[0].message })
  }
  let { name, email, password } = req.body
  try {
    const userExist = await userModel.findOne({ email: email })
    if (userExist) {
      return res.status(409).json({ "error": "the email is already in use" })
    }
    const salt = await bcrypt.genSalt(9)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword
    })
    return res.status(200).json({ message: "user created sucsessfully", "name": newUser.name, "email": newUser.email })
  } catch (error) {
    return res.status(500).json(error)
  }
}