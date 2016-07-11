  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity: .2
  });


var states = ['AL', 'AK', 'AZ', 'AR', 'CA',	'CO',	'CT',	'DE',	'FL',	'GA',	'HI',	'ID',	'IL',	'IN',	'IA',	'KS',	'KY',	'LA',	'ME',	'MD',	'MA',	'MI',	'MN',	'MS',	'MO',	'MT',	'NE',	'NV',	'NH',	'NJ',	'NM',	'NY',	'NC',	'ND',	'OH',	'OK',	'OR',	'PA',	'RI',	'SC',	'SD',	'TN',	'TX',	'UT',	'VT',	'VA',	'WA',	'WV',	'WI',	'WY']

$('.modal-trigger').click(function() {
  var i = 1;
  for (var state of states) {
    $('#states').append('<option value="' + i + '">' + state + '</option>');
    i += 1;
  }
  $('select').material_select();
});

var api_key = 'key-f740d2cbc40cb72e3c00dc229d3ee613';
var domain = 'www.bryanbrophy.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'postmaster@www.bryanbrophy.com',
  to: USEREMAIL,
  subject: 'Welcome to Addressing Room',
  text: 'Thank you for registering for Addressing Room! You can now start adding some websites that you keep your address on and we\'ll help you keep them up to date!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
