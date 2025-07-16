const Joi = require("joi");

const userJoi = Joi.object({
    user:Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  phoneno: Joi.string()
    .length(10)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.length': 'Phone number must be exactly 10 digits',
      'string.pattern.base': 'Phone number must contain only digits'
    }),

  location: Joi.string()
    .min(3)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};\'":\\\\|,.<>/?]{6,30}$'))
    .messages({
     'string.pattern.base': 'Password must be 6-30 characters and include letters, numbers, or symbols',
      'string.empty': 'Password is required'
    })
    .required(),

  repeat_password: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords must match'
    }),

    role:Joi.string()
    .required(),

    help:Joi.string()
    .required(),

})
});


module.exports = {userJoi};
