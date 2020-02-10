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
    moviesGen(query);

    // // Chiamata AJAX
    // function moviesGen(query) {
    //   var api_key = '2b58b15f91fb2dc424491e1a3e58babc';
    //   var url = 'https://api.themoviedb.org/3/search/movie';
    //   var query = $('#title').val();
    //
    //   $.ajax(
    //     {
    //       'url': url,
    //       'method': "GET",
    //       'data': {
    //         api_key: api_key,
    //         query: query,
    //         language: language
    //       },
    //       'success': function(data) {
    //         if (data.results.length > 0) {
    //           listGen(data);
    //           console.log(listGen(data));
    //         } else {
    //           alert('Non ci sono risultati');
    //         }
    //       },
    //       'error': function (request, state, errors) {
    //         alert('errore : inserire un titolo' + errors);
    //       }
    //     }
    //   );
    // }


  });
});

// Funzioni _______________________________

// Chiamata AJAX
function moviesGen(query) {
  var api_key = '2b58b15f91fb2dc424491e1a3e58babc';
  var url = 'https://api.themoviedb.org/3/search/movie';
  var language = 'it-IT';

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
          listGen(data);
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


function listGen(data) {
  // Template  Handlebars
  var source = $('#entry-template').html();
  var template = Handlebars.compile(source);

  var films = data.results;

  for (var i = 0; i < films.length; i++) {
    var src = "img/" + films[i].original_language + ".png";
    var context =
    {
      title : films[i].title,
      originalTitle : films[i].original_title,
      originalLanguage : films[i].original_language,
      // il valore convertito in scala da 1 a 5
      // voteAverage : voteConverter(films[i].vote_average),
      voteAverage: voteToStar(films[i].vote_average),
      // id: "voto-" + i,
      src: src
    };

    var html = template(context);
    $('.film_list').append(html);
    // voteToStar(context.voteAverage, i);
  }
}
//Converte il voto dalla scala da 1 - 10 a 1 - 5
// function voteConverter(num) {
//   var result = Math.ceil(num / 2);
//   return result;
// }

function voteToStar(num){
  // voteConverter(result);
  var result = Math.ceil(num / 2);
  var starVote = '';

  for (var i = 1; i <= 5; i++) {
    if (i <= result) {
      starVote += '<i class="fas fa-star"></i>';
    } else {
      starVote += '<i class="far fa-star"></i>';
    }
  }
  return starVote;
  console.log(starVote);
}

//Aggiunge la classe yellow alle stelle in base al voto
// function voteToStar(value, i){
//   if (value >= 1) {
//     $('#voto-' + i + ' i:nth-child(1)').addClass('yellow');
//   }
//   if (value >= 2) {
//     $('#voto-' + i + ' i:nth-child(2)').addClass('yellow');
//   }
//   if (value >= 3) {
//     $('#voto-' + i + ' i:nth-child(3)').addClass('yellow');
//   }
//   if (value >= 4) {
//     $('#voto-' + i + ' i:nth-child(4)').addClass('yellow');
//   }
//   if (value == 5) {
//     $('#voto-' + i + ' i:nth-child(5)').addClass('yellow');
//   }
// }
