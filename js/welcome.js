


var recs = ['Bank of America', 'Amazon', 'Comcast', 'Seattle City Light', 'Ebay', 'Seattle Times', 'AT&T', 'University of Washington', 'Allstate', 'BECU', 'Etsy', 'Geico', 'Wells Fargo', 'Key Bank', 'US Bank'];
var i = 1;

var $bankOfAmerica = $('#bankOfAmerica');

var recObject = {

}

$(document).ready(function() {
  for (var rec of recs) {
    $('#recs').append('<option class="recInput" value="' + i + '">' + rec + '</>')
    i++
  }
  $('select').material_select();
});

// $('li span input:first-child').eq(1).attr('checked', true)
// When bank of america image is clicked on
// add checkbox to dropdown list
$('img').click(function(event) {
  var clickArray = []
  $(event.target).toggleClass("select-border");
  console.log(this.id);
  $('li span input:first-child').eq(this.id).attr('checked', true);
});
