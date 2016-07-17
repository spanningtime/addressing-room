(function() {
  'use strict';

  exports.up = function(knex) {
    return knex.schema.createTable('sites', (table) => {
      table.increments();
      table.string('website_name')
      .notNullable()
      .defaultTo('');
      table.string('url')
      .notNullable()
      .defaultTo('');
      table.text('instructions')
      .notNullable()
      .defaultTo('Hey! It looks like you added this site on your own. We are working on finding instructions to help you in the future.');
      table.string('img_url')
      .notNullable()
      .defaultTo('');
      table.timestamps(true, true);
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('sites');
  };
})();
