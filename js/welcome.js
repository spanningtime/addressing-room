
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

var recs = ['Bank of America', 'Amazon', 'Comcast', 'Seattle City Light', 'Ebay', 'Seattle Times', 'AT&T', 'University of Washington', 'Allstate', 'BECU', 'Etsy', 'Geico', 'Wells Fargo', 'Key Bank', 'US Bank'];
var i = 1;

$(document).ready(function() {
  for (var rec of recs) {
    $('#recs').append('<option class="recInput" value="' + i + '">' + rec + '</>')
    i++
  }
  $('select').material_select();
});


$('img').click(function(event) {
  var $idOfElement = $('li span input:first-child').eq(Number.parseInt(this.id) + 1);
  console.log(this.id);
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
      console.log(x);
      if($(event.target).eq(0).text() === recs[x]) {
        $('#' + (x)).toggleClass('select-border');
      }
    };
  });
})



$('li').click(function(event) {
  console.log('hello world');
});



// overide checkbox selection input to only display "More websites"
$(document).ready(function() {
  $('li').click(function() {
    $('.more').children().children(0).eq(1).val("more");
  });
})
