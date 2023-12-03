import Joi from 'joi';

const userValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  pincode: Joi.string().required(),
});

export { userValidation };
