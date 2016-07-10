


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
  var $idOfElement = $('li span input:first-child').eq(this.id);
  $(event.target).toggleClass("select-border");
  if ($(event.target).hasClass("select-border")) {
    $idOfElement.attr('checked', true);
  }
  else {
    $idOfElement.attr('checked', false);
  }
});

// overide checkbox selection input to only display "More websites"
$(document).ready(function() {
  $('li').click(function() {
    $('input').eq(0).val("more websites");
  });
})
