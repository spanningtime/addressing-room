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
      zip: '98155'
      },
      {
      id: 2,
      email: 'butt@butts.com',
      hashed_password: '$2a$12$/DxOSWrVUBZPWnpYGIQUmO6LfCo/DJiNz3Q3IvUHIfugVpfvyMo1W',
      name: 'Butt McGee',
      address_1: '1234 Butt circle',
      address_2: 'Apt 69',
      city: 'Buttopia',
      state: 'AZ',
      zip: '10203'
      },
      {
      id: 3,
      email: 'boob@boobss.com',
      hashed_password: '2a$12$4yGCD/Lclrkv/4SBptimG.KMqrA2.aMca29MPJHb5XM7T4fo.9mVC',
      name: 'Boobs McGoogh',
      address_1: '13453 Boobss Way',
      address_2: 'Unit 80085',
      city: 'Roanoke',
      state: 'VA',
      zip: 'GINAS ARE COOL'
      },
    ])
  })
  .then(() => {
    return knex.raw(
      "SELECT setval ('users_id_seq', (SELECT MAX(id) FROM users))"
    );
  });
};
