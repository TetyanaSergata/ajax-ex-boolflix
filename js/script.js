// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// -Titolo  -Titolo Originale  -Lingua  -Voto.
$(document).ready(function() {
  // Template  Handlebars
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);


  // Click on
  $(document).on('click', '.button', function() {
    // Variabili
    var element = $(this);
    var api_key = '2b58b15f91fb2dc424491e1a3e58babc';
    var query = $('#title').val();
    var language = 'it-IT';

    // Chiamata AJAX
    $.ajax(
      {
        'url': "https://api.themoviedb.org/3/search/movie",
        'method': "GET",
        'data': {
          api_key: api_key,
          query: query,
          language: language
          },
        'success': function(data) {
            var films = data.results;

            // Il ciclo For
            for (var i = 0; i < films.length; i++) {
              var context =
              {
                title : films[i].title,
                originalTitle : films[i].original_title,
                originalLanguage : films[i].original_language,
                voteAverage : films[i].vote_average

              };
              var html = template(context);
              $('.film_list').append(html);
            }

          },
        'error': function (request, state, errors) {
            alert('errore' + errors);
          }
      }
    );

return;
    // Il ciclo For
    for (var i = 0; i <= films.length; i++) {
      var context =
      {
        title : films[i].title,
      };
      var html = template(context);
    }


  });
});
