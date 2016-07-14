'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    user_id: Joi.number()
      .label('User Id')
      .integer()
      .greater(0)
      .required(),

    website_id: Joi.number()
      .label('Site Id')
      .integer()
      .greater(0)
      .required()
  }
};

module.exports.patch = module.exports.post
module.exports.delete = module.exports.post

module.exports.getById = {
  body: {
    website_id: Joi.number()
      .label('Site Id')
      .integer()
      .greater(0)
      .required()
  }
};
