(function () {
  'use strict';

  var website_name;

  var website_id;

  var websiteGetUrl;

  var websitePatchUrl;

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

  var $sitesModalTable = $('.sites-modal-table');
  $sitesModalTable.hide();

  var getSitesAjax = function() {
    var counter = 0;

    for (var rec of selectedRecs) {
      var dataRecSites = {
        website_name: rec
      };

      var websiteString = '/sites/' + rec;

      var $xhr = $.ajax ({
        method: 'GET',
        url: websiteString,
        contentType: 'application/json',
        data: JSON.stringify(dataRecSites)
      });

      $xhr.done(function(site) {
        counter += 1;
        siteIds.push(site.id);

        if (counter === selectedRecs.length) {
          postNewMembershipAjax();
        };
      });

      $xhr.fail(function(err) {
        console.log(err);
      });
    };
  };

  var postNewMembershipAjax = function() {
    for (var siteId of siteIds) {
      var dataNewMembership = {
        user_id: userId,
        website_id: siteId
      };

      var $xhr = $.ajax ({
        method:'POST',
        url: '/memberships',
        contentType: 'application/json',
        data: JSON.stringify(dataNewMembership)
      });

      $xhr.done(function() {
        siteIds = [];
        checkSiteStatus();
      });

      $xhr.fail(function(err) {
        console.log(err);
      });
    };
  };

  var postCustomSitesAjax = function() {
    var counter = 0;
    for (var site of addedSites) {
      var dataNewCustomSite = {
        website_name: site.name,
        url: site.url
      };
      var $xhr = $.ajax({
        method: 'POST',
        url: '/sites/',
        contentType: 'application/json',
        data: JSON.stringify(dataNewCustomSite)
      });

      $xhr.done(function(site) {
        siteIds.push(site.id)
        counter += 1;
        if (counter = addedSites.length) {
          postNewMembershipAjax();
        };
      });

      $xhr.fail(function(err) {
        console.log(err);
      });
    };
  };

  var addedSites = [];

  $('#sites-modal-save').click(function() {
    var counter = 0;
    for (var x = 0; x < $('#sites-modal-table tr').length; x++) {
      var sitesInfo = {}
      sitesInfo.name = $('.site-td-name').eq(x).text();
      sitesInfo.url = $('.site-td-url').eq(x).text();
      addedSites.push(sitesInfo);
      counter += 1;
      if (counter === $('#sites-modal-table tr').length) {
        postCustomSitesAjax();
      }
    }
    console.log(addedSites);
  });

  $('.add').click(function() {
    var $urlInput = $('#url').children().eq(0);
    var $websiteInput = $('#website-name').children().eq(0);
    if ($urlInput.val() === ""  || !$websiteInput.val() === "") {
      Materialize.toast('Please enter a Website Name and URL before clicking', 3000)
      return;
    }
    $sitesModalTable.show();
    $('#sites-modal-table').append('<tr><td class="site-td-name">' + $websiteInput.val() + '</td>' + '<td class="site-td-url">' + $urlInput.val() + '</td></tr>');
    $websiteInput.val("");
    $urlInput.val("");
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

      for (var membership of memberships) {
        if (!membership.is_upToDate) {
          $('#readyToUpdate').append('<tr><td class="websiteName center">' + membership.website_name + '</td><td class="center">' + membership.url + '</td><td class="center"><a href="#modal3" class="instructBtn modal-trigger waves-effect waves-blue btn-floating btn-flat">→</a></td></tr>');
        }

        if (membership.is_upToDate) {
          $('#upToDate').append('<tr><td class="center">' + membership.website_name + '</td><td class="center">' + membership.url + '</td><td class="center"><p>✓</p></td></tr>');
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
      $('.instructionsList').append('<p><input type="checkbox" id="confirm" /><label for="confirm">Check this box after you have updated your address at ' + website_name + '.</label></p>');
    });

    $xhr.fail(function() {
      console.log('Bad');
    });
  };

  var changeSiteStatus = function() {
    if ($('#confirm').prop('checked')) {
      var dataPatch = { user_id: userId, website_id };

      var $xhr = $.ajax({
        method: 'PATCH',
        url: '/memberships',
        contentType: 'application/json',
        data: JSON.stringify(dataPatch)
      });

      $xhr.done(function(membership) {
        checkSiteStatus();
      });

      $xhr.fail(function() {
        console.log('Butthole');
      });
    }
  };

  $('.done').click(function() {
    changeSiteStatus();
  });

  checkSiteStatus();
})();
