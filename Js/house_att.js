var statistics = {                                   //Estadísticas tomadas para las tablas.
    glance: {
        "number_democrats_reps": 0,
        "number_republicans_reps": 0,
        "number_independents_reps": 0,
        "number_total_reps": 0,
        "pct_democrat_voted_with_party": 0,
        "pct_republicans_voted_with_party": 0,
        "pct_independents_voted_with_party": 0,
        "pct_total_voted_with_party": 0
    }
}
 
var array = (data.results[0].members);
var leastoftenvoteArray = [];
var mostoftenvoteArray = [];
var mostpartyvoteArray = [];
var leastpartyvoteArray = [];
var democratArray = [];
var democratvotesArray = [];
var republicanArray = [];
var republicanvotesArray = [];
var independentArray = [];
var independentvotesArray = [];
var totalvotesArray = [];

// 10% mas bajo de missed votes

function orderleastmissedVotes() {
    array.sort(function (a, b) {        //.sort en una función sirve para comparar valores
        return b.missed_votes_pct - a.missed_votes_pct;      //devuelve % de votos perdidos - % de votos perdidos para sacar un total
    });
    for (var i = 0; i < array.length; i++) {
        if (leastoftenvoteArray.length < (array.length * 0.1) || leastoftenvoteArray[leastoftenvoteArray.length - 1].missed_votes_pct == array[i].missed_votes_pct) {
            leastoftenvoteArray.push(array[i]);
        }
    }
    var result = "",
        y = null,
        z = "";
    for (i = 0; i < leastoftenvoteArray.length; i++) {
        if (leastoftenvoteArray[i].middle_name == y) {
            result += "<tr>" + "<td>" + '<a href="' + leastoftenvoteArray[i].url + '">' + leastoftenvoteArray[i].first_name + ' ' + z + ' ' + leastoftenvoteArray[i].last_name + "</a>" + "</td>";
        } else {
            result += "<tr>" + "<td>" + '<a href="' + leastoftenvoteArray[i].url + '">' + leastoftenvoteArray[i].first_name + ' ' + leastoftenvoteArray[i].middle_name + ' ' + leastoftenvoteArray[i].last_name + "</a>" + "</td>";
        }
        result += "<td class='party'>" + leastoftenvoteArray[i].missed_votes + "</td>";
        result += "<td class='state'>" + leastoftenvoteArray[i].missed_votes_pct + "</td>" + "</tr>";
    }
    if ((window.location.pathname.includes("/house_att.html")) || (window.location.pathname.includes("/senate_att.html"))) {
        document.getElementById("leastmissedvote").innerHTML = result;
    }
}
orderleastmissedVotes();

// 10% mas alto de missed votes
 
function ordermostmissedVotes() {
    array.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
    for (var i = 0; i < array.length; i++) {
        if (mostoftenvoteArray.length < (array.length * 0.1) || mostoftenvoteArray[mostoftenvoteArray.length - 1].missed_votes_pct == array[i].missed_votes_pct) {
            mostoftenvoteArray.push(array[i]);
        }
    }
 
    var result = "",
        y = null,
        z = "";
    for (i = 0; i < mostoftenvoteArray.length; i++) {
        if (mostoftenvoteArray[i].middle_name == y) {
            result += "<tr>" + "<td>" + '<a href="' + mostoftenvoteArray[i].url + '">' + mostoftenvoteArray[i].first_name + ' ' + z + ' ' + mostoftenvoteArray[i].last_name + "</a>" + "</td>";
        } else {
            result += "<tr>" + "<td>" + '<a href="' + mostoftenvoteArray[i].url + '">' + mostoftenvoteArray[i].first_name + ' ' + mostoftenvoteArray[i].middle_name + ' ' + mostoftenvoteArray[i].last_name + "</a>" + "</td>";
        }
        result += "<td class='party'>" + mostoftenvoteArray[i].missed_votes + "</td>";
        result += "<td class='state'>" + mostoftenvoteArray[i].missed_votes_pct + "</td>" + "</tr>";
    }
    if ((window.location.pathname.includes("/house_att.html")) || (window.location.pathname.includes("/senate_att.html"))) {
        document.getElementById("mostmissedvote").innerHTML = result;
    }
}
ordermostmissedVotes();
 
$(document).ready(function() {
    $('#example').DataTable();
  } );
  
  $(document).ready(function() {
    $('#example2').DataTable();
  } );
  
  //Encotnrar % congresistas
  fillPartyArray("D", democratArray);
  fillPartyArray("R", republicanArray);
  calcVotes(array, totalvotesArray, "Total")
   
   
  function fillPartyArray(partyValue, targetArray) {  //Función para el nº de representantes
      for (var i = 0; i < array.length; i++) {
          if (array[i].party == partyValue) {      //comparamos si el Partido del miembro es igual al valor en base al siguiente switch
              targetArray.push(array[i]);          // Hacemos push para insertar el valor.
          }
      }
      switch (partyValue) {                        //Iniciamos switch para agregar condicionales
          case "D":                  // caso D (Democrat)
              statistics.glance.number_democrats_reps = JSON.stringify(targetArray.length); // Si el numero de demócratas = JSON.stringfy de la longitud del targetArray ---->
              document.getElementById("demnumrep").innerHTML = statistics.glance.number_democrats_reps; //inserta (getElement...) en el HTML (innerHTML) el total de demócratas con la id "demnumrep"
              calcVotes(targetArray, democratvotesArray, "D");
              break;
          case "R":
              statistics.glance.number_republicans_reps = JSON.stringify(targetArray.length);
              document.getElementById("repnumrep").innerHTML = statistics.glance.number_republicans_reps;
              calcVotes(targetArray, republicanvotesArray, "R");
              break;
      }
      statistics.glance.number_total_reps = JSON.stringify(array.length);
      document.getElementById("totalnumrep").innerHTML = array.length;
  }
   
  function calcVotes(targetArray, averageArray, partyValue) {             //función cálculo de Votos totales
      for (var i = 0; i < targetArray.length; i++) {
          averageArray.push(JSON.parse(targetArray[i].votes_with_party_pct));
      }
      var suma = 0;
      for (i = 0; i < averageArray.length; i++) {
          suma += averageArray[i];
      }
      var media = suma / averageArray.length;
   
      switch (partyValue) {
          case "D":
              statistics.glance.pct_democrat_voted_with_party = media.toFixed(2);
              document.getElementById("demvotedparty").innerHTML = statistics.glance.pct_democrat_voted_with_party;
              break;
          case "R":
              statistics.glance.pct_republicans_voted_with_party = media.toFixed(2);
              document.getElementById("repvotedparty").innerHTML = statistics.glance.pct_republicans_voted_with_party;
              break;
          case "Total":
              statistics.glance.pct_total_voted_with_party = media.toFixed(2);
              document.getElementById("totalvotedparty").innerHTML = statistics.glance.pct_total_voted_with_party;
              break;
      }
  }




