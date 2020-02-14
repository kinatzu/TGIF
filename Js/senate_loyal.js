//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var members

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
	method: "GET",
	headers: {
    'X-API-KEY': 'IOm0zWuxC5T9Ql3DgwVADArCWD8nEQiHc2kEAWKz'
  }
}).then(function (data) {
		return data.json();
	})
.then(function(table) {
  console.log(table);
  members = table.results[0].members;
  orderleastpartyVotes();
  ordermostpartyVotes();
  fillPartyArray("D", democratArray);
  fillPartyArray("R", republicanArray);
  fillPartyArray("I", independentArray);
  calcVotes(members, totalvotesArray, "Total")
})
// .catch(function(error) {
//   console.log("Request failed:" + error.message);
// });


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
 
// var members = (data.results[0].members);
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
// fillPartyArray("D", democratArray);
// fillPartyArray("R", republicanArray);
// fillPartyArray("I", independentArray);
// calcVotes(members, totalvotesArray, "Total")
 
function fillPartyArray(partyValue, targetArray) {
    console.log(members);
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == partyValue) {
            targetArray.push(members[i]);
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
    statistics.glance.number_total_reps = JSON.stringify(members.length);
    document.getElementById("totalnumrep").innerHTML = members.length;
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
  // 10% mas bajo de party votes
 
function orderleastpartyVotes() {
    members.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
    for (var i = 0; i < members.length; i++) {
        if (leastpartyvoteArray.length < (members.length * 0.1) || leastpartyvoteArray[leastpartyvoteArray.length - 1].votes_with_party_pct == members[i].votes_with_party_pct) {
            leastpartyvoteArray.push(members[i]);
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
// orderleastpartyVotes()
 
// 10% mas alto de party votes
 
function ordermostpartyVotes() {
    members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });
    for (var i = 0; i < members.length; i++) {
        if (mostpartyvoteArray.length < (members.length * 0.1) || mostpartyvoteArray[mostpartyvoteArray.length - 1].votes_with_party_pct == members[i].votes_with_party_pct) {
            mostpartyvoteArray.push(members[i]);
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
        result += "<td class='state'>" + mostpartyvoteArray[i].votes_with_party_pct + "</td>" + "</tr>";
    }
    if ((window.location.pathname.includes("/senate_loyal.html")) || (window.location.pathname.includes("/house_loyal.html"))) {
        document.getElementById("mostpartyvote").innerHTML = result;
    }
}
// ordermostpartyVotes()

// $(document).ready(function() {
//     $('#example').DataTable();
//   } );
  
//   $(document).ready(function() {
//     $('#example2').DataTable();
//   } );
