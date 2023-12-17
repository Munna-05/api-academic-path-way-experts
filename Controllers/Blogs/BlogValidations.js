import Joi from 'joi';

const blogValidation = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title is required.',
    'string.base': 'Title must be a string.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'A short Description is required.',
    'string.base': 'Title must be a string.',
  }),
  content: Joi.string().required().messages({
    'any.required': 'Content is required.',
    'string.base': 'Content must be a string.',
  }),
  author: Joi.string().required().messages({
    'any.required': 'Author is required.',
    'string.base': 'Author must be a string.',
  }),
  image: Joi.string().messages({
    'string.base': 'Image Required.',
  }),
});

export default blogValidation;
