import Joi from 'joi';

const userValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required.',
    'string.base': 'Name must be a string.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.base': 'Email must be a string.',
    'string.email': 'Invalid email format.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
    'string.base': 'Password must be a string.',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Phone number is required.',
    'string.base': 'Phone number must be a string.',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required.',
    'string.base': 'Address must be a string.',
  }),
  pincode: Joi.string().required().messages({
    'any.required': 'Pincode is required.',
    'string.base': 'Pincode must be a string.',
  }),
});

export { userValidation };
