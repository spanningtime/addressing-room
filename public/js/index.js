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


var registerAjax = function() {
  var dataRegister = {
    email: $('#emailReg').val(),
    password: $('#passwordReg').val(),
    name: $('#name').val(),
    address_1: $('#address_1').val(),
    address_2: $('#address_2').val(),
    city: $('#city').val(),
    state: $('#states :selected').text(),
    zip: $('#zip').val()
  };

  var $xhr = $.ajax({
    method: 'POST',
    url: '/users',
    contentType: 'application/json',
    data: JSON.stringify(dataRegister)
  });

  $xhr.done(function() {
    window.location.href = '/welcome.html';
  });

  $xhr.fail(function() {

    if ($xhr.status === 409) {
      return Materialize.toast('User already exists. Please login.', 3000);
    }

    Materialize.toast('User could not be created. Please try again.', 3000);
  });
};

$('#register').click(function(event) {
  event.preventDefault();

  console.log('Hello Pepe!');
  registerAjax();
});
