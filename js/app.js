(function() {
  'use strict';

  var movies = [];
  var submitBtn = $("#searchSubmit");
  var search = $('#search');
  var renderMovies = function() {
    $('#listings').empty();

    for (var movie of movies) {
      var $col = $('<div class="col s6">');
      var $card = $('<div class="card hoverable">');
      var $content = $('<div class="card-content center">');
      var $title = $('<h6 class="card-title truncate">');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50, });
      $title.text(movie.Title);

      var $poster = $('<img class="poster">');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      var $action = $('<div class="card-action center">');
      var $plot = $('<a class="waves-effect waves-light btn modal-trigger">');

      $plot.attr('href', `#${movie.Id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      var $modal = $(`<div id="${movie.id}" class="modal">`);
      var $modalContent = $('<div class="modal-content">');
      var $modalHeader = $('<h4>').text(movie.Title);
      var $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      var $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
      console.log(movie.Title);
    }
  };

  // Listen for submissions on the search form. Remember to prevent the default action.

  submitBtn.click(function(e){
    e.preventDefault();
    if (!search.val()) {
      Materialize.toast('Please enter a movie title.', 4000);
    } else {
       $.getJSON('http://www.omdbapi.com/?s=' + search.val(), function(data){
        for ( var movie in data.Search ) {
          movies.push(data.Search[movie]);
        }
        renderMovies();
        search.val('');
        movies = [];
      });
    }
  });

})();
