import Joi from 'joi';

const postValidation = Joi.object({
  content: Joi.string().required().messages({
    'any.required': 'Content is required.',
    'string.base': 'Content must be a string.',
  }),
  userId: Joi.string().hex().length(24).required().messages({
    'any.required': 'User ID is required.',
    'string.base': 'Invalid User ID format.',
    'string.hex': 'Invalid User ID format.',
    'string.length': 'Invalid User ID length.',
  }),
  likes: Joi.array().items(Joi.string().hex().length(24)).messages({
    'string.base': 'Invalid Like User ID format.',
    'string.hex': 'Invalid Like User ID format.',
    'string.length': 'Invalid Like User ID length.',
  }),
  comments: Joi.array().items(Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
      'any.required': 'Comment User ID is required.',
      'string.base': 'Invalid Comment User ID format.',
      'string.hex': 'Invalid Comment User ID format.',
      'string.length': 'Invalid Comment User ID length.',
    }),
    content: Joi.string().required().messages({
      'any.required': 'Comment content is required.',
      'string.base': 'Comment content must be a string.',
    }),
    createdAt: Joi.date(),
  })),
});

export default postValidation;
