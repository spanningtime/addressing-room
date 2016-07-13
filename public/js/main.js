(function () {
  'use strict';

  window.COOKIES = {};
  document.cookie.split('; ').forEach((prop) => {
    const propKey = prop.split('=')[0];
    const propValue = prop.split('=')[1];

    window.COOKIES[propKey] = propValue;
  });

  if(!window.COOKIES.loggedIn) {
    window.location.href = '/index.html';
  }

  var userName = window.COOKIES.userName;

  $('.nav-wrapper').prepend('<h4 class="brand-logo left user hide-on-med-and-down hello">HELLO ' + userName.toUpperCase() + '</h4>');

  $('.medSmall').prepend('<h4 class="brand-logo center user userSm hide-on-large-only hello">HELLO ' + userName.toUpperCase() + '</h4>');

  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on hover
    gutter: 20, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'right' // Displays dropdown with edge aligned to the left of button
  });

  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity: .2
  });

  var states = ['AL', 'AK', 'AZ', 'AR', 'CA',	'CO',	'CT',	  'DE',	'FL',	'GA',	'HI',	'ID',	'IL',	'IN',	'IA',	'KS',	  'KY',	'LA',	'ME',	'MD',	'MA',	'MI',	'MN',	'MS',	'MO',	  'MT',	'NE',	'NV',	'NH',	'NJ',	'NM',	'NY',	'NC',	'ND',	  'OH',	'OK',	'OR',	'PA',	'RI',	'SC',	'SD',	'TN',	'TX',	  'UT',	'VT',	'VA',	'WA',	'WV',	'WI',	'WY']

  $('.modal-trigger').click(function() {
    var i = 1;
    for (var state of states) {
      $('#states').append('<option value="' + i + '">' +  state + '</option>');
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

  var checkSiteStatus = function() {
    var $xhr = $.ajax({
      method: 'GET',
      url: '/users/sites'
    });

    $xhr.done(function(memberships) {
      if (memberships.length < 1) {
        $('.firstSection').append(
          '<div class="col s12"><p>Add some sites that you keep your address on<br> and we\'ll help you keep them up to date!</p></div>'
        );
      }

      for (var membership of memberships) {
        if (!membership.is_upToDate) {
          $('#readyToUpdate').append('<tr><td class="center">' + membership.website_name + '</td><td class="center">' + membership.url + '</td></tr>');
        }

        if (membership.is_upToDate) {
          $('#upToDate').append('<tr><td class="center">' + membership.website_name + '</td><td class="center">' + membership.url + '</td></tr>');
        }
      }
    });

    $xhr.fail(function() {
      $('.firstSection').append('<div class="col s12"><p>There was an error retrieving your website memberships.<br> Please refresh your page to try again.</p></div>');
    });
  };

  checkSiteStatus();
})();
