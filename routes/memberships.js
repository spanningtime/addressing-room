'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const ev = require('express-validation');
const validations = require('../validations/memberships');

const checkAuth = function(req, res, next) {
  if (!req.session.userId) {
    const err = new Error('Unauthorized');
    err.statusCode = 401;

    return next(err);
  }

  next();
};

router.post('/memberships', checkAuth, (req, res, next) => {
  const user_id = req.body.user_id;
  const website_id = req.body.website_id;

  knex('memberships')
    .where('user_id', user_id)
    .where('site_id', website_id)
    .first()
    .then((membership) => {
      if (membership) {
        const err = new Error('Duplicate membership');
        err.status = 400;

        throw err;
      }

      return knex('memberships')
        .insert({
          user_id: user_id,
          site_id: website_id
        }, '*');
    })
    .then((memberships) => {
      res.send(memberships[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/memberships', (req, res, next) => {
  const user_id = req.body.user_id;
  const website_id = req.body.website_id;

  knex('memberships')
    .where('user_id', user_id)
    .where('site_id', website_id)
    .update({ is_upToDate: 't'})
    .then((memberships) => {
      res.send(memberships[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/memberships', checkAuth, (req, res, next) => {
  const user_id = req.session.userId;

  console.log(user_id);

  knex('sites')
    .orderBy('sites.website_name')
    .innerJoin('memberships', 'memberships.site_id', 'sites.id')
    .where('memberships.user_id', req.session.userId)
    .then((sites) => {
      res.send(sites);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/memberships/:siteId', checkAuth, (req, res, next) => {
  const user_id = req.session.userId;
  const website_id = Number.parseInt(req.params.siteId);

  knex('sites')
  .innerJoin('memberships', 'memberships.site_id', 'sites.id')
  .where({
    'sites.id': website_id,
    'memberships.user_id': user_id
  })
  .first()
  .then((site) => {
    if(!site) {
      return next();
    }

    res.send(site);
  })
  .catch((err) => {
    next(err);
  });
});

router.delete('/memberships/:siteId', checkAuth, (req, res, next) => {
  const user_id = req.session.userId;
  const website_id = Number.parseInt(req.params.siteId);

  knex('memberships')
    .where({
      'memberships.user_id': user_id,
      'memberships.site_id': website_id
    })
    .first()
    .then((site) => {
      if(!site) {
        return next();
      }

      return knex('memberships')
        .del()
        .where({
          'memberships.user_id': user_id,
          'memberships.site_id': website_id
        })
        .then(() => {
          delete site.id;
          return res.send(site);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
