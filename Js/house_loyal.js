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
  fillPartyArray("I", independentArray);
  calcVotes(array, totalvotesArray, "Total")
   
   
  function fillPartyArray(partyValue, targetArray) {
      for (var i = 0; i < array.length; i++) {
          if (array[i].party == partyValue) {
              targetArray.push(array[i]);
          }
      }
      switch (partyValue) {
          case "D":
              statistics.glance.number_democrats_reps = JSON.stringify(targetArray.length);
              document.getElementById("demnumrep").innerHTML = statistics.glance.number_democrats_reps;
              calcVotes(targetArray, democratvotesArray, "D");
              break;
          case "R":
              statistics.glance.number_republicans_reps = JSON.stringify(targetArray.length);
              document.getElementById("repnumrep").innerHTML = statistics.glance.number_republicans_reps;
              calcVotes(targetArray, republicanvotesArray, "R");
              break;
          case "I":
              statistics.glance.number_independents_reps = JSON.stringify(targetArray.length);
              document.getElementById("indnumrep").innerHTML = statistics.glance.number_independents_reps;
              calcVotes(targetArray, independentvotesArray, "I");
              break;
      }
      statistics.glance.number_total_reps = JSON.stringify(array.length);
      document.getElementById("totalnumrep").innerHTML = array.length;
  }
   
  function calcVotes(targetArray, averageArray, partyValue) {
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
          case "I":
              statistics.glance.pct_independents_voted_with_party = media.toFixed(2);
              document.getElementById("indvotedparty").innerHTML = statistics.glance.pct_independents_voted_with_party;
              break;
          case "Total":
              statistics.glance.pct_total_voted_with_party = media.toFixed(2);
              document.getElementById("totalvotedparty").innerHTML = statistics.glance.pct_total_voted_with_party;
              break;
      }
  }

  