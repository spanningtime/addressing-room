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
