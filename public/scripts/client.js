/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    //empty .tweet-container for easy rendering
    $('.tweet-container').empty();
    for (let eachTweet of tweets) {
      $newTweetElement = createTweetElement(eachTweet);
      $('.tweet-container').prepend($newTweetElement);
    }
    return;
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    const $tweet = $('<article class="tweet"></article>');

    
    const $appendTweet =  $(`<header>
      <div class="tweet-header-left">
        <img id="small-avatar" src="${data["user"]["avatars"]}"> 
        <h2>${data["user"]["name"]}</h2>
      </div>
      <div class="tweet-header-right">
        <h3>${data["user"]["handle"]}</h3>
      </div>
    </header>
   <p>${escape(data["content"]["text"])}</p>
  <footer>
    <h6>${timeago.format(data["created_at"])}</h6>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>`);

    $tweet.append($appendTweet);
    console.log($tweet);
    return $tweet;
  }

  $('#submit-tweet').on("submit", function(event){
    event.preventDefault();
    let textEntered = $(this).serialize().slice(5);
    textEntered = textEntered.split("%20").join(" ");
    if (textEntered.length > 140) {
      $('.error-msg').empty();
      $box = $("<p> ⚠️ Error: the tweet is longer than 140 characters.</p>").addClass('error-msg-show');
      $('.error-msg').prepend($box);
      $box.hide().slideDown();
      return;
    } else if (!textEntered) {
      $('.error-msg').empty();
      $box = $("<p> ⚠️ Error: the tweet is empty.</p>").addClass('error-msg-show');
      $('.error-msg').prepend($box);
      $box.hide().slideDown();
      return;
    }

    $('.error-msg').empty();
    $.ajax({
      url: '/tweets/',
      method: "POST",
      data: $(this).serialize()
    })
    .then((result)=>{
      loadTweets();
      $('#tweet-text').val('');
      $(".container output").val(140).removeClass("redCounter");
    })
    .catch((error)=>{
      console.log('error:',error);
    });

  });

  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: "GET"
    })
    .then((result)=>{

      renderTweets(result);
    })
    .catch((error)=>{
      console.log('error:',error);
    });
  }

  loadTweets();
});


