'use strict';

exports.seed = function(knex) {
  return knex('users').del()
  .then(() => {
    return knex('users').insert([{
      id: 1,
      email: 'stanley@assbook.com',
      hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
      name: 'Stanley Whatever',
      address_1: '123 Bark Lane',
      address_2: 'Apt 69',
      city: 'Shoreline',
      state: 'WA',
      zip: '98155',
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    }])
  })
  .then(() => {
    return knex.raw(
      "SELECT setval ('users_id_seq', (SELECT MAX(id) FROM users))"
    );
  });
};
