'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/addressing_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/addressing_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
