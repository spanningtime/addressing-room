(function () {
  'use strict';

  var website_name;

  var website_id;

  var websiteGetUrl;

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

  $('.nav-wrapper').prepend('<h4 class="brand-logo left user hide-on-med-and-down hello">' + userName.toUpperCase() + '</h4>');

  $('.medSmall').prepend('<h4 class="brand-logo center user userSm hide-on-large-only hello">' + userName.toUpperCase() + '</h4>');

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
        $('.firstSection').empty();
        $('.firstSection').append(
          '<div class="col s12"><p>Add some sites that you keep your address on<br> and we\'ll help you keep them up to date!</p></div>'
        );
      }

      else {
        $('#readyToUpdate').empty();
        $('#upToDate').empty();
      }

      for (var membership of memberships) {
        if (!membership.is_upToDate) {
          $('#readyToUpdate').append('<tr><td class="websiteName center">' + membership.website_name + '</td><td class="center">' + membership.url + '</td><td class="center"><a href="#modal3" class="instructBtn modal-trigger waves-effect waves-blue btn-floating btn-flat">→</a></td></tr>');
        }

        if (membership.is_upToDate) {
          $('#upToDate').append('<tr><td class="center">' + membership.website_name + '</td><td class="center">' + membership.url + '</td></tr>');
        }
      }
      $(".modal-trigger").leanModal();

      $('.instructBtn').click(function() {
        website_name = $(this).closest('tr').children('.websiteName').text()
        websiteGetUrl = '/sites/' + website_name;
        getInstructions();
      });
    });

    $xhr.fail(function() {
      $('.firstSection').append('<div class="col s12"><p>There was an error retrieving your website memberships.<br> Please refresh your page to try again.</p></div>');
    });
  };

  var getInstructions = function() {
    var $xhr = $.ajax({
      method: 'GET',
      url: websiteGetUrl
    });

    $xhr.done(function(site) {
      website_id = site.id;
      var steps = site.instructions.split('. ');
      $('.instructionsModal').empty();
      $('.instructionsModal').append('<h4 class="center">Update your Address at ' + website_name + '</h4>');
      $('.instructionsModal').append('<ul class="instructionsList"><ul>');
      for (var step of steps) {
        $('.instructionsList').append('<li>' + step + '</li>');
      }
      $('.instructionsList').append('<p><input type="checkbox" id="test5" /><label for="test5">Check this box after you have updated your address at ' + website_name + '.</label></p>');
    });

    $xhr.fail(function() {
      console.log('Bad');
    });
  };

  var changeSiteStatus = function() {

  };

  checkSiteStatus();
})();
