// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// -Titolo  -Titolo Originale  -Lingua  -Voto.
$(document).ready(function() {
  // Click on
  $(document).on('click', '.button', function() {
    var element = $(this);
    // Variabili
    var api_key = '2b58b15f91fb2dc424491e1a3e58babc';
    var query = 'ritorno';

    // Chiamata AJAX
    $.ajax(
      {
        'url': "https://api.themoviedb.org/3/search/movie",
        'method': "GET",
        'data': {
          api_key: api_key,
          query: query
          },
        'success': function(data) {
            console.log(data);
          },
        'error': function (request, state, errors) {
            alert('errore' + errors);
          }
      }
    );

  });
});
