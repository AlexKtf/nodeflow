$(document).ready(function () {
  $('.remove-jumbotron').on('click', function (){
    $(this).parent().fadeOut();
  });

  $('.flash').delay(3000).fadeOut();
});
