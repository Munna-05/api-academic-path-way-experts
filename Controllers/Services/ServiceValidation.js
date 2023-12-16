import Joi from 'joi';

const serviceValidation = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title is required.',
    'string.base': 'Title must be a string.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required.',
    'string.base': 'Description must be a string.',
  }),
  image: Joi.string().required().messages({
    'any.required': 'Image is required.',
    'string.base': 'image must be a string.',
  }),
  countries: Joi.array().items(Joi.string()).messages({
    'array.base': 'Countries must be an array.',
    'array.includesRequiredUnknowns': 'Countries array must not include unknown values.',
    'string.base': 'Each country must be a string.',
  }),
  createdBy: Joi.string().hex().length(24).required().messages({
    'any.required': 'Created by is required.',
    'string.base': 'Invalid Created by ID format.',
    'string.hex': 'Invalid Created by ID format.',
    'string.length': 'Invalid Created by ID length.',
  }),
});

export default serviceValidation;
