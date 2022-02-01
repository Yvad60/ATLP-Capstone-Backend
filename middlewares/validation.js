import { handleResponse } from "../controllers/index.js"
import { validArticleSchema, validUpdateArticleSchema, validNewUserSchema } from "../validation/validation.js"

const newArticleValidation = (req, res, next) => {
  const newArticleInputs = req.body
  const validationErrors = validArticleSchema.validate(newArticleInputs).error
  if (validationErrors) {
    return res.status(400).json(handleResponse("fail", 400, { "error": validationErrors.details[0].message }))
  }
  return next()
}
const updateArticleValidation = (req, res, next) => {
  const articleUpdates = req.body
  if (Object.keys(articleUpdates).length === 0) {
    return res.status(400).json(handleResponse('fail', 400, { "error": "must update either title,author or content" }))
  }
  const validationErrors = validUpdateArticleSchema.validate(articleUpdates).error
  if (validationErrors) {
    return res.status(400).json(handleResponse('fail', 400, { "error": validationErrors.details[0].message }))
  }
  return next()
}

const newUserValidation = (req, res, next) => {
  const validationErrors = validNewUserSchema.validate(req.body).error
  if (validationErrors) {
    return res.status(400).json(handleResponse('fail', 400, { "error": validationErrors.details[0].message }))
  }
  return next()
}


export { newArticleValidation, updateArticleValidation, newUserValidation }


