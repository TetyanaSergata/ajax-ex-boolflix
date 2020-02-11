// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// -Titolo  -Titolo Originale  -Lingua  -Voto.
$(document).ready(function() {
  // Click on
  $(document).on('click', '.button', function() {
    // Variabili
    var query = $('#title').val();  // Value dell'input

    // Svuota la lista precedente
    $('.film_list').html('');
    $('#title').val('');
    //Valori movies
    var movie_api_key = '2b58b15f91fb2dc424491e1a3e58babc';
    var movie_url = 'https://api.themoviedb.org/3/search/movie';
    var movie_language = 'it-IT';
    moviesGen(query, 'film', movie_api_key, movie_url, movie_language);
    //Valori tv
    var tv_api_key = '2b58b15f91fb2dc424491e1a3e58babc';
    var tv_url = 'https://api.themoviedb.org/3/search/tv';
    var tv_language = 'it-IT';
    moviesGen(query, 'tv', tv_api_key, tv_url, tv_language);
  });
});

// Funzioni _______________________________

// Chiamata AJAX
// function '...' (valori da passare alla funzione per fare i calcoli)
function moviesGen(query, type, api_key, url, language) {
  $.ajax(
    {
      'url': url,
      'method': "GET",
      'data': {
        api_key: api_key,
        query: query,
        language: language
      },
      'success': function(data) {
        if (data.results.length > 0) {
          var films = data.results;
          listGen(type, films);
        } else {
          alert('Non ci sono risultati');
        }
      },
      'error': function (request, state, errors) {
        alert('errore : inserire un titolo' + errors);
      }
    }
  );
}


function typeOfMovie(type){
  if( type == 'film' ){
    titleType = 'Films'
  } else if (type == 'tv') {
    titleType = 'Serie Tv'
  }
  $('.film_list').append('<h1>' + titleType + '<h1>');
}

function listGen(type, results) {
  var idTemplate;
  var title;
  var originalTitle;
  var titleType;

  // Funzione per tipo di file
  typeOfMovie(type);
  for (var i = 0; i < results.length; i++) {
    var src = "img/" + results[i].original_language + ".png";
    if (type == 'film') {
      idTemplate = '#film-template';
      title = results[i].title;
      originalTitle = results[i].original_title;
    } else if (type == 'tv'){
      idTemplate = '#tv-template';
      title = results[i].name;
      originalTitle = results[i].original_name;
    }


    // Parte del poster-image
    var urlPoster = 'https://image.tmdb.org/t/p/w342';
    var posterPath;


    if (results[i].poster_path == null) {
      posterPath = '<img src="img/Poster_not_available.jpg" alt="Poster film" >'
      console.log(posterPath);
    } else {
      posterPath = '<img src=" '+ urlPoster + results[i].poster_path + ' " alt="'+ title +'">'
      console.log(posterPath);
    }



    // Template  Handlebars
    var source = $(idTemplate).html();
    var template = Handlebars.compile(source);

    var context =
    {
      type: type,
      title : title,
      originalTitle : originalTitle,
      originalLanguage : results[i].original_language,
      voteAverage: voteToStar(results[i].vote_average),
      src: src,
      coverPoster : posterPath
    };

    var html = template(context);
    $('.film_list').append(html);
  }

}
//Converte il voto dalla scala da 1 - 10 a 1 - 5
function voteConverter(num) {
  var result = Math.ceil(num / 2);
  return result;
}

function voteToStar(num){
  // il valore convertito in scala da 1 a 5
  // var result = Math.ceil(num / 2);
  var result = voteConverter(num);
  var starVote = '';

  for (var i = 1; i <= 5; i++) {
    if (i <= result) {
      starVote += '<i class="fas fa-star yellow"></i>';

    } else {
      starVote += '<i class="far fa-star grey"></i>';
    }
  }
  return starVote;
}
