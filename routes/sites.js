'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/sites', (req, res, next) => {
  knex('sites')
    .orderBy('id')
    .then((sites) => {
      res.send(sites);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/sites/:name', (req, res, next) => {
  knex('sites')
    .where('website_name', req.params.name)
    .first()
    .then((site) => {
      if (!site) {
        return next();
      }
      res.send(site);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/sites', (req, res, next) => {
  const { website_name, url } = req.body;
    knex('sites')
      .where('website_name', website_name)
      .first()
      .then((site) => {
        if (site) {
          console.log("Add logic for sites already existing in database");
          return;
        }

        return knex('sites')
          .insert(req.body, '*')
          .then((results) => {
            res.send(results[0]);
        })
      })
      .catch((err) => {
        next(err)
      });
});

module.exports = router;
