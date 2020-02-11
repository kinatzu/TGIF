var statistics = { 
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

  // 10% mas bajo de party votes
 
function orderleastpartyVotes() {
    array.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
    for (var i = 0; i < array.length; i++) {
        if (leastpartyvoteArray.length < (array.length * 0.1) || leastpartyvoteArray[leastpartyvoteArray.length - 1].votes_with_party_pct == array[i].votes_with_party_pct) {
            leastpartyvoteArray.push(array[i]);
        }
    }
    var result = "",
        y = null,
        z = "";
    for (i = 0; i < leastpartyvoteArray.length; i++) {
        if (leastpartyvoteArray[i].middle_name == y) {
            result += "<tr>" + "<td>" + '<a href="' + leastpartyvoteArray[i].url + '">' + leastpartyvoteArray[i].first_name + ' ' + z + ' ' + leastpartyvoteArray[i].last_name + "</a>" + "</td>";
        } else {
            result += "<tr>" + "<td>" + '<a href="' + leastpartyvoteArray[i].url + '">' + leastpartyvoteArray[i].first_name + ' ' + leastpartyvoteArray[i].middle_name + ' ' + leastpartyvoteArray[i].last_name + "</a>" + "</td>";
        }
        result += "<td class='party'>" + (leastpartyvoteArray[i].total_votes - leastpartyvoteArray[i].missed_votes) + "</td>";
        result += "<td class='state'>" + leastpartyvoteArray[i].votes_with_party_pct + "</td>" + "</tr>";
    }
    if ((window.location.pathname.includes("/senate_loyal.html")) || (window.location.pathname.includes("/house_loyal.html"))) {
        document.getElementById("leastpartyvote").innerHTML = result;
    }
}
orderleastpartyVotes()
 
// 10% mas alto de party votes
 
function ordermostpartyVotes() {
    array.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });
    for (var i = 0; i < array.length; i++) {
        if (mostpartyvoteArray.length < (array.length * 0.1) || mostpartyvoteArray[mostpartyvoteArray.length - 1].votes_with_party_pct == array[i].votes_with_party_pct) {
            mostpartyvoteArray.push(array[i]);
        }
    }
    var result = "",
        y = null,
        z = "";
    for (i = 0; i < mostpartyvoteArray.length; i++) {
        if (mostpartyvoteArray[i].middle_name == y) {
            result += "<tr>" + "<td>" + '<a href="' + mostpartyvoteArray[i].url + '">' + mostpartyvoteArray[i].first_name + ' ' + z + ' ' + mostpartyvoteArray[i].last_name + "</a>" + "</td>";
        } else {
            result += "<tr>" + "<td>" + '<a href="' + mostpartyvoteArray[i].url + '">' + mostpartyvoteArray[i].first_name + ' ' + mostpartyvoteArray[i].middle_name + ' ' + mostpartyvoteArray[i].last_name + "</a>" + "</td>";
        }
        result += "<td class='party'>" + (mostpartyvoteArray[i].total_votes - mostpartyvoteArray[i].missed_votes) + "</td>";
        result += "<td class='state'>" + mostpartyvoteArray[i].votes_with_party_pct + "</td>" + "</tr>";    //si añadimos % entre el votes_with_party_pct y el td añadimos %  los resultados
    }
    if ((window.location.pathname.includes("/senate_loyal.html")) || (window.location.pathname.includes("/house_loyal.html"))) {
        document.getElementById("mostpartyvote").innerHTML = result;
    }
}
ordermostpartyVotes()


$(document).ready(function() {
    $('#example').DataTable();
  } );
  
  $(document).ready(function() {
    $('#example2').DataTable();
  } );