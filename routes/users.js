'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

const ev = require('express-validation');
const validations = require('../validations/users');

const Mailgun = require('mailgun-js');
const api_key = 'key-f740d2cbc40cb72e3c00dc229d3ee613';
const domain = 'www.bryanbrophy.com';
const from_who = 'get@bryanbrophy.com';

router.post('/users', ev(validations.post), (req, res, next) => {
  const { email, password, name, address_1, address_2, city, state, zip } = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('email', email)
    .first()
    .then((exists) => {
      if (exists) {
        return res
          .status(409)
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
      const mailgun = new Mailgun({apiKey: api_key, domain: domain});

      const data = {
        from: from_who,
        to: email,
        subject: 'Welcome to Addressing Room',
        text: `Hey, ${name}!\n\nThank you for registering for Addressing Room! You are a true soldier, and we salute you, dawg.\n\nHugs and Kisses...\n\n From ya boiyz at Addressing Room`
      };

      mailgun.messages().send(data, (err, body) => {
        if (err) {
          throw err;
        }

        console.log(body);
      });

      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
