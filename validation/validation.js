import Joi from "joi";

const validUserSchema = Joi.object({
  name: Joi.
    string().min(2).required().messages({
      "string.empty": "name can not be empty",
      "string.min": "name must have at least {{#limit}} characters",
      "any.required": "name is required"
    }),
  password: Joi.
    string().min(5).required().messages({
      "string.empty": "password can not be empty",
      "string.min": "password must have at least 5 characters",
      "any.required": "password is required"
    }),
  email: Joi.
    string().email().required().messages({
      "string.empty": "email can not be empty",
      "string.email": "email must be a valid email",
      "any.required": "email is required"
    })
})


const validArticleSchema = Joi.object({
  title: Joi.string().min(5).required().messages({
    "string.empty": "article title can not be empty",
    "string.min": "aticle title  must have at least 8 characters",
    "any.required": "article title is required"
  }),
  author: Joi.string().min(2).required().messages({
    "string.empty": "article author can not be empty",
    "string.min": "aticle author  must have at least 2 characters",
    "any.required": "article author is required"
  }),
  content: Joi.string().min(10).required().messages({
    "string.empty": "article contents can not be empty",
    "string.min": "aticle contents  must have at least 10 characters",
    "any.required": "article content is required"
  })
})

const validUpdateArticleSchema = Joi.object({
  title: Joi.string().min(5).required().optional().messages({
    "string.empty": "article title can not be empty",
    "string.min": "aticle title  must have at least 8 characters",
    "any.required": "article title is required"
  }),
  author: Joi.string().min(2).required().optional().messages({
    "string.empty": "article author can not be empty",
    "string.min": "aticle author  must have at least 2 characters",
    "any.required": "article author is required"
  }),
  content: Joi.string().min(10).required().optional().messages({
    "string.empty": "article contents can not be empty",
    "string.min": "aticle contents  must have at least 10 characters",
    "any.required": "article content is required"
  })
})


const validLoginSchema = Joi.object({
  password: Joi.
    string().min(5).required().messages({
      "string.empty": "password can not be empty",
      "any.required": "password is required"
    }),
  email: Joi.
    string().email().required().messages({
      "string.empty": "email can not be empty",
      "string.email": "email must be a valid email",
      "any.required": "email is required"
    })
})
export { validUserSchema, validArticleSchema, validLoginSchema, validUpdateArticleSchema }

