'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');


router.post('/session', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    const err = new Error('Email must not be blank');
    err.statusCode = 400;

    return next(err);
  }

  if (!password || password.trim() === '') {
    const err = new Error('Password must not be blank');
    err.statusCode = 400;

    return next(err);
  }

  let user;

  knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        const err = new Error('Unauthorized')
        err.status = 401;

        throw err;
      }

      user = row;

      const hashed_password = user.hashed_password;

      return bcrypt.compare(password, hashed_password);

    })
    .then(() => {
      req.session.userId = user.id;
      res.cookie('loggedIn', true);
      res.cookie('userName', user.name, { encode: String });
      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      const err = new Error('Unauthorized');
      err.status = 401;

      return next(err);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/session', (req, res) => {
  delete req.session.userId;
  res.clearCookie('loggedIn');
  res.clearCookie('userName');
  res.clearCookie('firstTime');
  res.sendStatus(200);
});

module.exports = router;
