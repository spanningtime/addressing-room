$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 20, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'right' // Displays dropdown with edge aligned to the left of button
    }
);

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

var logOutAjax = function() {
  var $xhr = $.ajax({
    method: 'DELETE',
    url: '/session'
  });

  $xhr.done(function() {
    window.location.href = '/index.html';
  });

  $xhr.fail(function() {
    console.log('Session Ended');
  });
};

$('#logOutLarge').click(function() {
  logOutAjax();
});

$('#logOutSmall').click(function() {
  logOutAjax();
});
