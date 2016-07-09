


var recs = ['Etsy', 'Geico', 'Wells Fargo', 'Key Bank', 'US Bank', 'Bank of America'];
var i = 1;

$(document).ready(function() {
  for (var rec of recs) {
    $('#recs').append('<option class="recInput" value="' + i + '">' + rec + '</>')
    i++
  }
  $('select').material_select();
});
