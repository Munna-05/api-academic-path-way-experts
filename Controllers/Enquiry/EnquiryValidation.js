import Joi from 'joi';

const enquiryValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Please provide a name.',
    'string.empty': 'Name cannot be empty.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Please provide an email address.',
    'string.email': 'Please provide a valid email address.',
    'string.empty': 'Email address cannot be empty.',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Please provide a phone number.',
    'string.empty': 'Phone number cannot be empty.',
  }),
  message: Joi.string().required().messages({
    'any.required': 'Please provide a message.',
    'string.empty': 'Message cannot be empty.',
  }),
  reply: Joi.string().messages({
    'string.empty': 'Reply cannot be empty.',
  }),
  status: Joi.boolean().default(false),
});

export default enquiryValidation;
