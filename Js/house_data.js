
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


//FILTER & SEARCH FUNCTION TABLES
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
    var votesParty = members[i].votes_with_party_pct + "% ";
    //DIFERENT VARIABLES TO OBTAIN THE DIFFERENT ATTRIBUTES OF EVERY MEMBER
    var insertCell = [link, party, state, seniority, votesParty];
    
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
    document.getElementById("houseData").innerHTML = "Ooops! No results found for your criteria.";
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


// const hMembers = data.results[0].members;


// //Datos a mostrar en la tabla
// createTable(hMembers, ["D", "R", "I"]);

// //Evenlistener checkboxes
// let checkBoxGroup = document.getElementsByName("filter");
// checkBoxGroup.forEach(checkbox => checkbox.addEventListener("click", () => filters()))

// function filters() {  //Función para los filtros tipo checkbox
//   let checkBoxFilters = Array.from(document.querySelectorAll('input[name=filter]:checked')).map(array => array.value);
//   createTable(hMembers, checkBoxFilters)
// }
// //Creación tabla con miembros y filtro
// function createTable(members, filter1, filter2) {
//   houseData.innerHTML = "";

//   let tableBody = document.getElementById("houseData"); //Creación tabla en id
//   let membersinfo = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

//   for (let i = 0; i < members.length; i++) {
//     if (filter1.includes(members[i].party) || filter1.length < 1) { //Condicional con OR para comprobar si contiene un determinado partido u otro
//       let newTr = document.createElement("tr");
//       for (let j = 0; j < membersinfo.length; j++) {
//         let insertInfo = membersinfo[j]; //Variable que toma todos los atributos de membersinfo
//         let newTd = document.createElement("td");
//         if (j == 0) {
//           let newAnchorTag = document.createElement("a");
//           newAnchorTag.setAttribute("href", members[i].url); //Crea atributo (link) dentro de <a>
//           newAnchorTag.setAttribute("target", "_blank"); //Ejecutar link en pestaña adicional
//           newAnchorTag.innerHTML = members[i][insertInfo];
//           if (j == 0 && members[i].middle_name != null) { //Condicional para buscar si hay middle name.
//             fullname = newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].middle_name} ${members[i].last_name}`;
//           } else {
//             newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].last_name}`;
//           }
//           newTd.appendChild(newAnchorTag);
//         } else {
//           newTd.innerHTML = members[i][insertInfo];
//         }
//         newTr.appendChild(newTd);
//       }
//       tableBody.appendChild(newTr);
//     }
//   }
//   if (tableBody.innerHTML == '') {
//     document.getElementById('houseData2').innerHTML = "Ooops! No results found for your criteria.";
//   }
// }


