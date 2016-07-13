'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('memberships', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('site_id')
      .notNullable()
      .references('id')
      .inTable('sites')
      .onDelete('CASCADE')
      .index();
    table.boolean('is_upToDate')
      .notNullable()
      .defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('memberships');
};
