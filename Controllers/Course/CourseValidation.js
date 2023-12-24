import Joi from 'joi';

const courseValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Please provide a course name.',
    'string.empty': 'Course name cannot be empty.',
  }),
  level: Joi.string().valid('UG', 'PG').required().messages({
    'any.required': 'Please specify the course level (UG or PG).',
    'any.only': 'Invalid course level. Must be UG or PG.',
  }),
  duration: Joi.number().required().messages({
    'any.required': 'Please provide the course duration.',
    'number.base': 'Course duration must be a number.',
  }),
  country: Joi.string().required().messages({
    'any.required': 'Please specify the Country name.',
    'string.empty': 'Country name cannot be empty.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Please provide a course description.',
    'string.empty': 'Course description cannot be empty.',
  }),
});

export default courseValidation;

