$(document).ready(function() {
  $('#example').DataTable();
} );

//TABLES
const members = data.results[0].members;

createTable();
showState(members);
states();
//START FUNCTION TO PRINT TABLES
function createTable() {
  var tbody = document.getElementById("senateData");
  tbody.innerHTML = "";
  for (var i = 0; i < members.length; i++) {
    //CREATES TR
    var newRow = document.createElement("tr");
    var firstName = members[i].first_name; 
    var middleName = members[i].middle_name;
    //STARTS 'IF' TO CHECK MIDDLE AND FIRST NAME, IF NOT ADD ONE SPACE
    if (middleName === null) {
      middleName = "";
    }
    var lastName = members[i].last_name;
    var fullname = firstName + " " + middleName + " " + lastName;
    //NEW VARIABLE TO PUT INSIDE <A> THE ATTRIBUTE HREF (URL OF THE MEMBER)
    var link = document.createElement("a");
    link.setAttribute("href", members[i].url);
    link.innerHTML = fullname;
    var party = members[i].party;
    var state = members[i].state;
    var seniority = members[i].seniority;
    var votesParty = members[i].votes_with_party_pct + "% ";
    var insertCell = [link, party, state, seniority, votesParty];
    //INSERTCELL AND THE ATTRIBUTES TO TABLE

    if (showData(members[i])) {
      for (var j = 0; j < insertCell.length; j++) {
        var tableCell = document.createElement("td");
        tableCell.append(insertCell[j]);
        newRow.append(tableCell);
      }
      document.getElementById("senateData").append(newRow);
    }
  }
  if (document.getElementById("senateData").innerHTML === "") {
    document.getElementById("senateData").innerHTML = "Ooops! No results found for your criteria.";
  }
}


document
  .querySelectorAll("input[name=filtro]")[0]
  .addEventListener("click", createTable);
document
  .querySelectorAll("input[name=filtro]")[1]
  .addEventListener("click", createTable);
document
  .querySelectorAll("input[name=filtro]")[2]
  .addEventListener("click", createTable);

function showData(members) {
  var dropdown = document.getElementById("filterstate").value;
  var checkBox = document.querySelectorAll("input[name=filtro]");
  var checkedParty = document.querySelectorAll("input[name=filtro]:checked");

  for (var k = 0; k < members.length; k++) {}

  if (checkedParty.length === 0 && dropdown == "All") {
    return true;
  }

  for (var j = 0; j < checkBox.length; j++) {
    if (
      checkBox[j].checked &&
      members.party == checkBox[j].value &&
      (dropdown === members.state || dropdown === "All")
    ) {
      return true;
    } else if (checkedParty.length === 0 && dropdown === members.state) {
      return true;
    }
  }

  return false;
}

function showState(members) {
  var dropdown = document.getElementById("filterstate").value;
  if (dropdown === members.state || dropdown === "All") {
    return true;
  }
}
document.getElementById("filterstate").addEventListener("change", createTable);

function states() {
  var filter = [];
  for (i = 0; i < members.length; i++) {
    if (filter.indexOf(members[i].state) == -1) {
      filter.push(members[i].state);
      filter.sort();
    }
  }
  for (var j = 0; j < filter.length; j++) {
    var option = document.createElement("option");
    option.classList.add("stateOptions");
    option.setAttribute("value", filter[j]);
    option.innerHTML = filter[j];
    var options = document.getElementById("filterstate");
    options.appendChild(option);
  }
}


