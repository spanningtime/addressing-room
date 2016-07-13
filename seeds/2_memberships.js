'use strict';

exports.seed = function(knex) {
  return knex('memberships').del()
    .then(() => {
      return knex('memberships')
        .insert([{
          id: 1,
          user_id: 1,
          site_id: 1,
        },
        {
          id: 2,
          user_id: 1,
          site_id: 2,
        },
        {
          id: 3,
          user_id: 1,
          site_id: 3,
        },
        {
          id: 4,
          user_id: 1,
          site_id: 4,
        },
        {
          id: 5,
          user_id: 2,
          site_id: 2,
        },
        {
          id: 6,
          user_id: 2,
          site_id: 5,
        },
        {
          id: 7,
          user_id: 2,
          site_id: 10,
        },
      ])
    })
    .then(() => {
      return knex.raw(
      "SELECT setval('memberships_id_seq', (SELECT MAX(id) FROM memberships));"
      );
    });
};
