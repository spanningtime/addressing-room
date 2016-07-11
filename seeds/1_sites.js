
exports.seed = function(knex) {
  return knex('sites').del()
  .then(( => {
    return knex('sites').insert([{
      id: 1,
      website_name: 'Amazon',
      url: 'www.amazon.com',
      instructions: 'Login to your user account. Click on "Your Account" in the navigation bar. Find the address book section and click "Manage Address" Book. Edit your old address or add a new one. Give a high five! You just changed your address at Amazon.',
      img_url: '../images/sites_icons/amazon_icon.png'
      is_upToDate: false,
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC')
    }])
  })
  .then(() => {
    return knex.raw(
      "SELECT setval ('sites_id_seq', (SELECT MAX(id) FROM users))"
    );
  });
};
