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

  $('.nav-wrapper').prepend('<h4 class="brand-logo left user hide-on-med-and-down">HELLO ' + userName.toUpperCase() + '</h4>');

  $('.medSmall').prepend('<h4 class="brand-logo center user userSm hide-on-large-only">HELLO ' + userName.toUpperCase() + '</h4>');


  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

  $('.add').click(function() {
    var $urlInput = $('#url').children().eq(0);
    var $websiteInput = $('#website-name').children().eq(0);
    $('#sites-modal-table').append('<tr><td class="site-td">' + $websiteInput.val() + '</td>' + '<td>' + $urlInput.val() + '</td></tr>');
    $websiteInput.val("");
    $urlInput.val("");
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

$('.add').click(function() {
  var $urlInput = $('#url').children().eq(0);
  var $websiteInput = $('#website-name').children().eq(0);
  $('#added-site-list').append('<li class="site-li">' + $websiteInput.val() + '<li>')
  $websiteInput.val("");
  $urlInput.val("");
});


var recs = ['Bank of America', 'Amazon', 'Comcast', 'Seattle City Light', 'Ebay', 'Seattle Times', 'AT&T', 'University of Washington', 'Allstate', 'BECU', 'Etsy', 'Geico', 'Wells Fargo', 'Key Bank', 'US Bank'];
var i = 1;

// get text value of recs dropdown
// $('.recInput').eq(0).text()
// get checked value of recs dropdown
// $('input:checked').eq(0).val()

var selectedRecs = []

$('#save').click(function() {
  for (var x = 4; x < $('span').length; x++) {
    if ($('span').eq(x).children().eq(0).is(':checked')) {
      selectedRecs.push($('span').eq(x).text())
    };
  };
  console.log(selectedRecs);
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
    $('#dropdownLabel').children().children().eq(1).val("more");
  });
});

  // overide checkbox selection input to only display "More websites"
  $(document).ready(function() {
    $('li').click(function() {
      $('.more').children().children(0).eq(1).val("more");
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
