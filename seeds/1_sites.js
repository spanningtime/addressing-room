
exports.seed = function(knex) {
  return knex('sites').del()
  .then(() => {
    return knex('sites').insert([{
      id: 1,
      website_name: 'Amazon',
      url: 'www.amazon.com',
      instructions: 'Login to your user account. Click on "Your Account" in the navigation bar. Find the address book section and click "Manage Address" Book. Edit your old address or add a new one. Give a high five! You just changed your address at Amazon.',
      img_url: '../public/images/sites_icons/amazon_icon.png'
      },
      {
      id: 2,
      website_name: 'Allstate',
      url: 'myaccount.allstate.com',
      img_url: '../public/images/sites_icons/allstate_icon.png'
      },
      {
      id: 3,
      website_name: 'Comcast',
      url: 'www.xfinity.com',
      img_url: '../public/images/sites_icons/comcast_icon.png'
      },
      {
      id: 4,
      website_name: 'BECU',
      url: 'www.becu.org',
      img_url: '../public/images/sites_icons/becu_icon.png'
      },
      {
      id: 5,
      website_name: 'Etsy',
      url: 'www.etsy.com',
      img_url: '../public/images/sites_icons/etsy_icon.png'
      },
      {
      id: 6,
      website_name: 'Ebay',
      url: 'www.ebay.com',
      img_url: '../public/images/sites_icons/ebay_icon.png'
      },
      {
      id: 7,
      website_name: 'Geico',
      url: 'www.geico.com',
      img_url: '../public/images/sites_icons/geico_icon.png'
      },
      {
      id: 8,
      website_name: 'KeyBank',
      url: 'www.key.com'
      },
      {
      id: 9,
      website_name: 'Seattle Times',
      url: 'www.seattletimes.com',
      img_url: '../public/images/sites_icons/seattle_times_icon.png'
      },
      {
      id: 10,
      website_name: 'University of Washington',
      url: 'www.washington.edu',
      img_url: '../public/images/sites_icons/uw_icon.png'
      },
      {
      id: 11,
      website_name: 'Seattle City Light',
      url: 'www.seattle.gov/light',
      img_url: '../public/images/sites_icons/city_light_icon.png'
      },
      {
      id: 12,
      website_name: 'AT&T',
      url: 'www.att.com',
      img_url: '../public/images/sites_icons/att_icon.png'
      },
      {
      id: 13,
      website_name: 'US Bank',
      url: 'www.usbank.com',
      }
    ])
  })
  .then(() => {
    return knex.raw(
      "SELECT setval ('sites_id_seq', (SELECT MAX(id) FROM sites))"
    );
  });
};
