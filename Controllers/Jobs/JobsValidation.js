import Joi from 'joi';

const jobValidation = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title is required.',
    'string.base': 'Title must be a string.',
  }),
  company: Joi.string().required().messages({
    'any.required': 'Company is required.',
    'string.base': 'Company must be a string.',
  }),
  location: Joi.string(),
  description: Joi.string().required().messages({
    'any.required': 'Description is required.',
    'string.base': 'Description must be a string.',
  }),
  key_res: Joi.array().items(Joi.string()), // Assuming key_res is an array of strings
  type: Joi.string().valid("Full-time", "Part-time", "Contract", "Freelance", "Internship"),
  experienceLevel: Joi.string().valid("Entry Level", "Mid Level", "Senior Level"),
  applyLink: Joi.string(), // Assuming applyLink is a string (URL)
  postedBy: Joi.string().hex().length(24).required().messages({
    'any.required': 'Posted by is required.',
    'string.base': 'Invalid Posted by ID format.',
    'string.hex': 'Invalid Posted by ID format.',
    'string.length': 'Invalid Posted by ID length.',
  }),
});

export default jobValidation;
