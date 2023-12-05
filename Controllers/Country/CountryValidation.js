import Joi from 'joi';

const countryValidation = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'any.required': 'Please provide a country name.',
      'string.empty': 'Country name cannot be empty.',
    })
    .min(3) // Custom validation: Minimum length of 3 characters
    .max(50) // Custom validation: Maximum length of 50 characters,
    .messages({
      'string.min': 'Country name must be at least {#limit} characters long.',
      'string.max': 'Country name cannot exceed {#limit} characters.',
    }),
  description: Joi.string()
    .required()
    .messages({
      'any.required': 'Please provide a country description.',
      'string.empty': 'Country description cannot be empty.',
    })
    .min(10) // Custom validation: Minimum length of 10 characters
    .max(200) // Custom validation: Maximum length of 200 characters
    .messages({
      'string.min': 'Country description must be at least {#limit} characters long.',
      'string.max': 'Country description cannot exceed {#limit} characters.',
    }),
  createdAt: Joi.date().default(new Date(), 'current date'),
  updatedAt: Joi.date().default(new Date(), 'current date'),
});

export default countryValidation;
