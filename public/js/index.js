(function() {
  'use strict';

  window.COOKIES = {};
  document.cookie.split('; ').forEach(function(prop) {
    var propKey = prop.split('=')[0];
    var propValue = prop.split('=')[1];

    window.COOKIES[propKey] = propValue;
  });

  if (window.COOKIES.loggedIn) {
    window.location.href = '/main.html';
  }

  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity: 0.2
  });

  var states = ['AL', 'AK', 'AZ', 'AR', 'CA',	'CO',	'CT',	'DE',	'FL',	'GA',	'HI',	'ID',	'IL',	'IN',	'IA',	'KS',	'KY',	'LA',	'ME',	'MD',	'MA',	'MI',	'MN',	'MS',	'MO',	'MT',	'NE',	'NV',	'NH',	'NJ',	'NM',	'NY',	'NC',	'ND',	'OH',	'OK',	'OR',	'PA',	'RI',	'SC',	'SD',	'TN',	'TX',	'UT',	'VT',	'VA',	'WA',	'WV',	'WI',	'WY'];

  $('.modal-trigger').click(function() {
    var x = 1;

    for (var i = 0; i < states.length; i++) {
      $('#states').append('<option value="' + x + '">' + states[i] + '</option>');
      x += 1;
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

      Materialize.toast('Password must contain at least 8 charachters. Please try again.', 3000);
    });
  };

  $('#register').click(function(event) {
    event.preventDefault();
    registerAjax();
  });

  var loginAjax = function() {
    var dataLogin = {
      email: $('#emailLog').val(),
      password: $('#passwordLog').val()
    };

    var $xhr = $.ajax({
      method: 'POST',
      url: '/session',
      contentType: 'application/json',
      data: JSON.stringify(dataLogin)
    });

    $xhr.done(function() {
      window.location.href = '/main.html';
    });

    $xhr.fail(function() {
      Materialize.toast('Login information is invalid.', 3000);
    });
  };

  $('#login').click(function() {
    var email = $('#emailLog').val().trim();
    var password = $('#passwordLog').val();

    if (!email) {
      return Materialize.toast('Please enter an email.', 2000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Please enter a valid email.', 2000);
    }

    if (!password) {
      return Materialize.toast('Please enter a password', 2000);
    }

    loginAjax();
  });
})();
