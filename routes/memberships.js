'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const checkAuth = function(req, res, next) {
  if (!req.session.userId) {
    const err = new Error('Unauthorized');
    err.statusCode = 401;

    return next(err);
  }

  next();
};

router.post('/users/sites/:siteId', checkAuth, (req, res, next) => {
  const userId = req.session.userId;
  const siteId = Number.parseInt(req.params.siteId);

  if (Number.isNaN(siteId)) {
    return next();
  }

  knex('sites')
    .where('id', siteId)
    .first()
    .then((site) => {
      if (!site) {
        const err = new Error('Invalid site Id');
        err.statusCode = 400;

        throw err;
      }

      return knex('memberships')
        .where('user_id', userId)
        .where('site_id', siteId)
        .first();
    })
    .then((membership) => {
      if (membership) {
        const err = new Error('Duplicate membership');
        err.status = 400;

        throw err;
      }

      return knex('memberships')
        .insert({
          user_id: userId,
          site_id: siteId
        }, '*');
    })
    .then((memberships) => {
      res.send(memberships[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/sites', checkAuth, (req, res, next) => {
  const userId = req.session.userId;

  knex('sites')
    .innerJoin('memberships', 'memberships.site_id', 'sites.id')
    .where('memberships.user_id', userId)
    .then((sites) => {
      res.send(sites);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/sites/:siteId', checkAuth, (req, res, next) => {
  const userId = req.session.userId;
  const siteId = Number.parseInt(req.params.siteId);

  knex('sites')
  .innerJoin('memberships', 'memberships.site_id', 'sites.id')
  .where({
    'sites.id': siteId,
    'memberships.user_id': userId
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

router.delete('/users/sites/:siteId', checkAuth, (req, res, next) => {
  const userId = req.session.userId;
  const siteId = Number.parseInt(req.params.siteId);

  if (Number.isNaN(siteId)) {
    return next();
  }

  knex('memberships')
    .where({
      'memberships.user_id': userId,
      'memberships.site_id': siteId
    })
    .first()
    .then((site) => {
      if(!site) {
        return next();
      }

      return knex('memberships')
        .del()
        .where({
          'memberships.user_id': userId,
          'memberships.site_id': siteId
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
