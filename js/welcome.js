


var recs = ['Allstate', 'Amazon', 'AT&T', 'BECU', 'Comcast', 'Ebay', 'Etsy', 'Geico', 'Wells Fargo', 'Key Bank', 'US Bank', 'Bank of America', 'Seattle City Light', 'The Seattle Times', 'University of Washington'];
var i = 1;

$(document).ready(function() {
  for (var rec of recs) {
    $('#recs').append('<option class="recInput" value="' + i + '">' + rec + '</>')
    i++
  }
  $('select').material_select();
});

$('img').click(function(event) {
  $(event.target).toggleClass("select-border")
});
