(function() {
  'use strict';

  exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('email')
      .unique()
      .notNullable();
      table.specificType('hashed_password', 'char(60)')
      .notNullable();
      table.string('name')
      .notNullable()
      .defaultTo('');
      table.text('address_1')
      .notNullable()
      .defaultTo('');
      table.text('address_2')
      .notNullable()
      .defaultTo('');
      table.string('city')
      .notNullable()
      .defaultTo('');
      table.string('state')
      .notNullable()
      .defaultTo('');
      table.string('zip')
      .notNullable()
      .defaultTo('');
      table.timestamps(true, true);
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
})();
