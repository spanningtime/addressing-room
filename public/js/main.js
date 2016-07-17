(function() {
  'use strict';

  var website_name;

  var website_id;

  var websiteGetUrl;

  window.COOKIES = {};
  document.cookie.split('; ').forEach(function(prop) {
    var propKey = prop.split('=')[0];
    var propValue = prop.split('=')[1];

    window.COOKIES[propKey] = propValue;
  });

  if (!window.COOKIES.loggedIn) {
    window.location.href = '/index.html';
  }

  var userName = window.COOKIES.userName;
  var userId = window.COOKIES.userId;
  var siteIds = [];

  // var userId = parseInt(window.COOKIES.userId);

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
    opacity: 0.2
  });

  var states = ['AL', 'AK', 'AZ', 'AR', 'CA',	'CO',	'CT', 'DE',	'FL',	'GA',	'HI',	'ID',	'IL',	'IN',	'IA',	'KS', 'KY', 'LA',	'ME',	'MD',	'MA',	'MI',	'MN',	'MS',	'MO', 'MT', 'NE', 'NV',	'NH',	'NJ',	'NM',	'NY',	'NC',	'ND', 'OH',	'OK',	'OR',	'PA',	'RI',	'SC',	'SD',	'TN',	'TX', 'UT', 'VT',	'VA',	'WA',	'WV',	'WI',	'WY'];

  $('.modal-trigger').click(function() {
    var i = 1;

    for (var x = 0; x < states.length; x++) {
      $('#states').append('<option value="' + i + '">' + states[x] + '</option>');
      i += 1;
    }
    $('select').material_select();
  });

  var $sitesModalTable = $('.sites-modal-table');

  $sitesModalTable.hide();

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
      for (var x = 0; x < steps.length; x++) {
        $('.instructionsList').append('<li>' + steps[x] + '</li>');
      }
      $('.instructionsList').append('<p><input type="checkbox" id="confirm" /><label for="confirm">Check this box after you have updated your address at ' + website_name + '.</label></p>');
    });

    $xhr.fail(function(err) {
      console.error(err);
    });
  };

  var checkSiteStatus = function() {
    var $xhr = $.ajax({
      method: 'GET',
      url: '/memberships'
    });

    $xhr.done(function(memberships) {
      if (memberships.length < 1) {
        $('.firstSection').empty();
        $('.firstSection').append(
          '<div class="col s12"><p>Use the menu to add sites to your profile and we\'ll<br>help you keep them up to date!</p></div>'
        );
      }

      else {
        $('#readyToUpdate').empty();
        $('#upToDate').empty();
      }

      for (var x = 0; x < memberships.length; x++) {
        if (!memberships[x].is_upToDate) {
          $('#readyToUpdate').append('<tr><td class="websiteName center">' + memberships[x].website_name + '</td><td class="center">' + memberships[x].url + '</td><td class="center"><a href="#modal3" class="instructBtn modal-trigger waves-effect waves-blue btn-floating btn-flat">→</a></td></tr>');
        }

        if (memberships[x].is_upToDate) {
          $('#upToDate').append('<tr><td class="center">' + memberships[x].website_name + '</td><td class="center">' + memberships[x].url + '</td><td class="center"><p>✓</p></td></tr>');
        }
      }
      $('.modal-trigger').leanModal();

      $('.instructBtn').click(function() {
        website_name = $(this).closest('tr').children('.websiteName').text();
        websiteGetUrl = '/sites/' + website_name;
        getInstructions();
      });
    });

    $xhr.fail(function() {
      $('.firstSection').append('<div class="col s12"><p>There was an error retrieving your website memberships.<br> Please refresh your page to try again.</p></div>');
    });
  };

  var postNewMembershipAjax = function() {
    for (var x = 0; x < siteIds.length; x++) {
      var dataNewMembership = {
        user_id: userId,
        website_id: siteIds[x]
      };

      var $xhr = $.ajax({
        method: 'POST',
        url: '/memberships',
        contentType: 'application/json',
        data: JSON.stringify(dataNewMembership)
      });

      $xhr.done(function() {
        siteIds = [];
        checkSiteStatus();
      });

      $xhr.fail(function() {
        Materialize.toast('Unable to add site. Please try again.');
      });
    }
  };

  var addedSites = [];

  var postCustomSitesAjax = function() {
    var counter = 0;

    for (var x = 0; x < addedSites.length; x++) {
      var siteName = addedSites[x].name.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      var dataNewCustomSite = {
        website_name: siteName,
        url: addedSites[x].url
      };
      var $xhr = $.ajax({
        method: 'POST',
        url: '/sites/',
        contentType: 'application/json',
        data: JSON.stringify(dataNewCustomSite)
      });

      $xhr.done(function(site) {
        siteIds.push(site.id);
        counter += 1;
        if (counter === addedSites.length) {
          postNewMembershipAjax();
        }
      });

      $xhr.fail(function() {
        Materialize.toast('Unable to add site. Please try again.');
      });
    }
  };

  $('#sites-modal-save').click(function() {
    var counter = 0;

    for (var x = 0; x < $('#sites-modal-table tr').length; x++) {
      var sitesInfo = {};

      sitesInfo.name = $('.site-td-name').eq(x).text();
      sitesInfo.url = $('.site-td-url').eq(x).text();
      addedSites.push(sitesInfo);
      counter += 1;
      if (counter === $('#sites-modal-table tr').length) {
        postCustomSitesAjax();
      }
    }
  });

  $('.add').click(function() {
    var $urlInput = $('#url').children().eq(0);
    var $websiteInput = $('#website-name').children().eq(0);

    if ($urlInput.val() === '' || !$websiteInput.val() === '') {
      Materialize.toast('Please enter a Website Name and URL before clicking', 3000);

      return;
    }
    $sitesModalTable.show();
    $('#sites-modal-table').append('<tr><td class="site-td-name">' + $websiteInput.val() + '</td>' + '<td class="site-td-url">' + $urlInput.val() + '</td></tr>');
    $websiteInput.val('');
    $urlInput.val('');
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
      Materialize.toast('Unable to logout. Please try again');
    });
  };

  $('#logOutLarge').click(function() {
    logOutAjax();
  });

  $('#logOutSmall').click(function() {
    logOutAjax();
  });

  var changeSiteStatus = function() {
    if ($('#confirm').prop('checked')) {
      var dataPatch = { user_id: userId, website_id: website_id };

      var $xhr = $.ajax({
        method: 'PATCH',
        url: '/memberships',
        contentType: 'application/json',
        data: JSON.stringify(dataPatch)
      });

      $xhr.done(function() {
        checkSiteStatus();
      });

      $xhr.fail(function(err) {
        console.error(err);
      });
    }
  };

  $('.done').click(function() {
    changeSiteStatus();
  });

  var updateUserAddress = function() {
    var dataUpdateAddress = {
      name: $('#name').val(),
      address_1: $('#address_1').val(),
      address_2: $('#address_2').val(),
      city: $('#city').val(),
      state: $('#states :selected').text(),
      zip: $('#zip').val()
    };

    var patchAddressUrl = '/users/' + userId;

    var $xhr = $.ajax({
      method: 'PATCH',
      url: patchAddressUrl,
      contentType: 'application/json',
      data: JSON.stringify(dataUpdateAddress)
    });

    $xhr.done(function() {
      checkSiteStatus();
    });

    $xhr.fail(function() {
      Materialize.toast('Unable to update information at this time. Please try again.');
    });
  };

  $('.update').click(function() {
    updateUserAddress();
  });

  checkSiteStatus();
})();
