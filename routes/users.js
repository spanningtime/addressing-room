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
      return knex('users').insert({
        email, hashed_password, name, address_1, address_2, city, state, zip
      }, '*');
    })
    .then((usersInserted) => {
      const mailgun = new Mailgun({apiKey: api_key, domain: domain});

      const data = {
        from: from_who,
        to: email,
        subject: 'Welcome to Addressing Room',
        text: `Hey, ${name}!\n\nThank you for registering for Addressing Room! You are a true soldier, and we salute you, dawg.\n\nHugs and Kisses...\nLove, Ya Boiyz at Addressing Room HQ (member FDIC)`
      };

      mailgun.messages().send(data, (err, body) => {
        if (err) {
          throw err;
        }
      });
      req.session.userId = usersInserted[0].id;
      res.cookie('firstTime', true);
      res.cookie('userId', usersInserted[0].id);
      res.cookie('userName', name, { encode: String });
      res.cookie('loggedIn', true);
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/users/:id', (req, res, next) => {
  knex('users')
    .update(req.body, '*')
    .where('id', req.params.id)
    .then((users) => {
      res.cookie('userName', users[0].name, { encode: String });
      res.send(users[0])
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
