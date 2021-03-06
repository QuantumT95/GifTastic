var topics = ["Spider Man", "The Falcon", "Deadpool", "Captain Marvel", "Black Panther", "Ant-Man", "Doctor Strange"];

// Function for adding buttons
  function renderButtons() {
    $("#superhero-view").empty();
    for (var i=0; i < topics.length; i++) {
      var m = $("<button>");
      m.addClass("topics");
      m.attr("data-name", topics[i]);
      m.text(topics[i]);
      $("#superhero-view").append(m);
    }
  }

// This function handles events where the add movie button is clicked
  $("#find-gif").on("click", function() {
    event.preventDefault();
    var superhero = $("#gif-input").val();
    topics.push(superhero);
    console.log(topics);
    renderButtons();
  });  

//emptys the gifs div and gets gifs and displays it onto the page
function displayGifs() {
      // Preventing the submit button from trying to submit the form
      // We're optionally using a form so the user may hit Enter to search instead of clicking the button
      event.preventDefault();

      $("#gifs-appear-here").empty();
      
      // Here we grab the text from the input box
      var gif = $(this).attr("data-name");

      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var s = $("<p>").text("Rating: " + rating);

            var superheroImage = $("<img>");
  
            superheroImage.attr("src", results[i].images.fixed_height_still.url);
            superheroImage.attr("data-still", results[i].images.fixed_height_still.url);
            superheroImage.attr("data-animate", results[i].images.fixed_height.url);
            superheroImage.attr("data-state", "still");
            superheroImage.addClass("gifClick");

            gifDiv.prepend(s);
            gifDiv.prepend(superheroImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
}

$(document).on("click", ".gifClick", function(){
  var state = $(this).attr("data-state");

  if(state == "still"){
    var url = $(this).attr("data-animate");
    $(this).attr("data-state", 'animate');
    $(this).attr("src", url);
  }
  else{
    var url = $(this).attr("data-still");
    $(this).attr("data-state", "still");
    $(this).attr("src", url);
  }

})

$(document).on("click", ".topics", displayGifs);


renderButtons();