import { handleResponse } from "../controllers/index.js"
import { validArticleSchema } from "../validation/validation.js"

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
  const validationErrors = validArticleSchema.validate(articleUpdates, { allowUnknown: true }).error
  if (validationErrors) {
    return res.status(400).json(handleResponse('fail', 400, { "error": validationErrors.details[0].message }))
  }
  return next()
}
export { newArticleValidation, updateArticleValidation }