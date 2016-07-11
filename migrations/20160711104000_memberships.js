'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('memberships', (table) => {
    table.increments();
    table.integer('memberships')
      .notNullable()
      .references('id')
  });
};

exports.down = function(knex) {

};
