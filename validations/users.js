'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim(),

    password: Joi.string()
      .regex(/[a-z\d]+/i)
      .label('Password')
      .required()
      .trim()
      .min(8)
  }
};
