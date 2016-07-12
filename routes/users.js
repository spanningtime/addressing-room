'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const ev = require('express-validation');
const validations = require('../validations/users');

router.post('/users', ev(validations.post), (req, res, next) => {
  const { email, password, name, address_1, address_2, city, state, zip } = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('email', email)
    .first()
    .then((exists) => {
      if (exists) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('Email already exists, Motherfucker.')
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashed_password) => {
      console.log(hashed_password);
      return knex('users').insert({
        email, hashed_password, name, address_1, address_2, city, state, zip
      });
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
