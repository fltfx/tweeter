$(document).ready(function() {
  const newTweet = $(".container textarea");

  newTweet.keyup(function() {
    let newChar = $(this).val();
    const counterOutput = 140 - newChar.length;
    if (counterOutput >= 0) {
      $(".container output").val(counterOutput).removeClass("redCounter");
    } else {
      $(".container output").val(counterOutput).addClass("redCounter");
    }
  })

});