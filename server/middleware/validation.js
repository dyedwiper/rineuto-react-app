const Joi = require('@hapi/joi');

function validateUser(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string()
      .min(4)
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    admin: Joi.boolean()
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  next();
}

function validateLogin(req, res, next) {
  const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  next();
}

module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
