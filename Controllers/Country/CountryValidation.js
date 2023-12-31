import Joi from 'joi';

const countryValidation = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'any.required': 'Please provide a country name.',
      'string.empty': 'Country name cannot be empty.',
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
    image:Joi.string().required().messages({'any.required':'Please upload an image of country'})
});

export default countryValidation;
