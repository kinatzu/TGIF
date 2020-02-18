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



//COLLAPSE FUNCTION
$(document).ready(function () {
    $('.nav-toggle').click(function () {
        var collapse_content_selector = $(this).attr('href');
        var toggle_switch = $(this);
        $(collapse_content_selector).toggle(function () {
            if ($(this).css('display') == 'none') {
                toggle_switch.html('Background History of Government Transparency');
            } else {
                toggle_switch.html('Background History of Government Transparency');
            }
        });
    });

});

//FETCH
var members

fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
  createTable()
  //showState(members);
  states();
  querySelectors();
  doSearch()
  boxLoading.style.display = 'none';
})
.catch(function(error) {
  console.log("Request failed:" + error.message);
  boxLoading.style.display = 'none';
});

// const members = json.results[0].members;

// function chargeMembers(){
//createTable();
//showState(members);
//states();
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    boxLoading.style.display = 'none';
    $("#houseData tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

//START FUNCTION TO PRINT TABLES
function createTable() {
  var tbody = document.getElementById("houseData");
  tbody.innerHTML = "";
  for (var i = 0; i < members.length; i++) {
    //LOOP TO FIND ALL THE MEMBERS
    var newRow = document.createElement("tr");
    //CREATE TR IN TABLE
    var firstName = members[i].first_name;
    var middleName = members[i].middle_name;
    //NEW VARIABLES TO CHECK IF HAVE MIDDLE NAME OR NOT
    if (middleName === null) {
      middleName = "";
    }
    var lastName = members[i].last_name;
    var fullname = firstName + " " + middleName + " " + lastName;
    //NEW VARIABLE TO ADD FIRST NAME + MIDDLE NAME + LAST NAME
    var link = document.createElement("a");
    link.setAttribute("href", members[i].url);
    //SETATTRIBUTE ADD AND ATTRIBUTE HREF (LINK OF MEMBER) INSIDE <A>
    link.innerHTML = fullname;
    var party = members[i].party;
    var state = members[i].state;
    var seniority = members[i].seniority;
    var votesParty = members[i].votes_with_party_pct;
    //DIFERENT VARIABLES TO OBTAIN THE DIFFERENT ATTRIBUTES OF EVERY MEMBER
    var insertCell = [link, party, state, seniority, votesParty + "%"];

    if (showData(members[i])) {
      
      for (var j = 0; j < insertCell.length; j++) {
        var tableCell = document.createElement("td");
        tableCell.append(insertCell[j]);
        newRow.append(tableCell);
      }
      document.getElementById("houseData").append(newRow);
    }
  }
  if (document.getElementById("houseData").innerHTML === "") {
    // document.getElementById("houseData").innerHTML = "Ooops! No results found for your criteria."; //IF THE RESULT OF THE SEARCH IS EMPTY, SHOWS THIS MESSAGE IN THE TABLE
    noResultsWarning.style.display = 'block'
  } else {
    noResultsWarning.style.display = 'none'
  }
}

//QUERYSELECTORS FILTERS CHECKBOXES. querySelectorAll() RETURNS A NODELIST OF YOUT TABLE DEPENDS THE RESULTS YOU WANT TO CHECK
function querySelectors() {

  document.querySelectorAll("input[name=filtro]")[0]
    .addEventListener("click", createTable);
  document.querySelectorAll("input[name=filtro]")[1]
    .addEventListener("click", createTable);
  document.querySelectorAll("input[name=filtro]")[2]
    .addEventListener("click", createTable);
  document.getElementById("filterstate").addEventListener("change", createTable);
}


//FUNCTION CHECKBOXES + DROPDOWN  
function showData(member) {
  var dropdown = document.getElementById("filterstate").value; //DROPDOWN STATES MENU 
  var checkBox = document.querySelectorAll("input[name=filtro]"); //PARTY CHECKBOX QUERYSELECTOR
  var checkedParty = document.querySelectorAll("input[name=filtro]:checked"); //HERE INSERTS THE RESULTS OF MEMBER WITH I, D or R FOR SHOWS LATER

  //for (var k = 0; k < member.length; k++) {}
  
  if (checkedParty.length === 0 && dropdown == "All") { //IF YOU SELECT ALL IN THE DROPDOWN, RETURMS 'TRUE' (SHOWS ALL THE STATES)
    return true;
  }

  for (var j = 0; j < checkBox.length; j++) { //NEW LOOP FOR THE CHECKBOXES
    if (checkBox[j].checked && member.party == checkBox[j].value && (dropdown === member.state || dropdown === "All") //COMBINATION OF TWO FILTERS (CHECKBOXES + STATE FILTERS)
    ) {
      return true;
    } else if (checkedParty.length === 0 && dropdown === member.state) {
      return true;
    }
  }

  return false;
}



//FUNCTION TO PRINT STATES INITIALS (NY, DK, AR...)
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


// //FILTER & SEARCH FUNCTION TABLES
// $(document).ready(function() {
//   $('#example').DataTable();
// } );


