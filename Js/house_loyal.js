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
