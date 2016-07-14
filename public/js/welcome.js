(function() {
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

  // if (!window.COOKIES.firstTime) {
  //   window.location.href = '/main.html';
  // }

  var userName = window.COOKIES.userName;
  var userId = window.COOKIES.userId;

  var selectedRecs = [];
  var siteIds = [];
  var customSites = [];

  $('.nav-wrapper').prepend('<h4 class="brand-logo left user hide-on-med-and-down">HELLO ' + userName.toUpperCase() + '</h4>');

  $('.medSmall').prepend('<h4 class="brand-logo center user userSm hide-on-large-only">HELLO ' + userName.toUpperCase() + '</h4>');

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
        siteIds.push(site.id)

        if (counter === selectedRecs.length) {
          postNewMembershipAjax();
        }
      });

      $xhr.fail(function() {
        console.log("Whole Butt");
      })
    }
    console.log(selectedRecs);
  };

  var postNewMembershipAjax = function() {
    for (var siteId of siteIds) {
      var dataNewMembership = {
        user_id: userId,
        site_id: siteId
      };

      var websiteString = '/memberships/' + siteId;

      var $xhr = $.ajax ({
        method:'POST',
        url: websiteString,
        contentType: 'application/json',
        data: JSON.stringify(dataNewMembership)
      });

      $xhr.done(function() {
        console.log(siteIds);
      });

      $xhr.fail(function() {
        console.log('fail');
      });
    };
  };




  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

  var $sitesModalTable = $('.sites-modal-table');
  $sitesModalTable.hide();

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
  })

  var addedSites = [];

  $('#sites-modal-save').click(function() {
    for (var x = 0; x < $('#sites-modal-table tr').length; x++) {
      var sitesInfo = {}
      sitesInfo.name = $('.site-td-name').eq(x).text();
      sitesInfo.url = $('.site-td-url').eq(x).text();
      addedSites.push(sitesInfo);
    }
  })


  var recs = ['Bank of America', 'Amazon', 'Comcast', 'Seattle City Light', 'Ebay', 'Seattle Times', 'AT&T', 'University of Washington', 'Allstate', 'BECU', 'Etsy', 'Geico', 'Wells Fargo', 'Key Bank', 'US Bank'];
  var i = 1;

  $(document).ready(function() {
    for (var rec of recs) {
      $('#recs').append('<option class="recInput" value="' + i + '">' + rec + '</>')
      i++
    }
    $('select').material_select();
  });



/* --- Welcome page save click -- */
$('#next').click(function() {
  for (var x = 4; x < $('span').length; x++) {
    if ($('span').eq(x).children().eq(0).is(':checked')) {
      selectedRecs.push($('span').eq(x).text())
    };
  };
  getSitesAjax();
});

$(document).ready(function() {
  for (var rec of recs) {
    $('#recs').append('<option class="recInput" value="' + i + '">' + rec + '</>')
    i++
  }
  $('select').material_select();
});

  $('img').click(function(event) {
    var $idOfElement = $('li span input:first-child').eq(Number.parseInt(this.id) + 1);
    $(event.target).toggleClass("select-border");
    if ($(event.target).hasClass("select-border")) {
      $idOfElement.attr('checked', true);
    }
    else {
      $idOfElement.attr('checked', false);
    }
  });

  $(document).ready(function() {
    $('li').click(function(event) {
      for (var x = 0; x < recs.length; x++) {
        if($(event.target).eq(0).text() === recs[x]) {
          $('#' + (x)).toggleClass('select-border');
        }
      };
    });
  });

// overide checkbox selection input to only display "More websites"
$(document).ready(function() {
  $('li').click(function() {
    $('#dropdownLabel').children().children().eq(1).val("Click here for more options");
  });
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

  $('#skip').click(function() {
    document.cookie = 'firstTime=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  });
})();
