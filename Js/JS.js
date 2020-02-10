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

const hMembers = data.results[0].members;
let noResults = document.querySelector("noResultsWarning");

//Datos a mostrar en la tabla
createTable(hMembers, ["D", "R", "I"]);

//Evenlistener checkboxes
let checkBoxGroup = document.getElementsByName("filter");
checkBoxGroup.forEach(checkbox => checkbox.addEventListener("click", () => filters()))

function filters() {
  let checkBoxFilters = Array.from(document.querySelectorAll('input[name=filter]:checked')).map(array => array.value);
  createTable(hMembers, checkBoxFilters)
}


//Creación tabla con miembros y filtro
function createTable(members, filter1) {
  houseData.innerHTML = "";

  let tableBody = document.getElementById("houseData");
  let membersinfo = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

  for (let i = 0; i < members.length; i++) {
    if (filter1.includes(members[i].party) || filter1.length < 1) {
      let newTr = document.createElement("tr");
      for (let j = 0; j < membersinfo.length; j++) {
        let insertInfo = membersinfo[j];
        let newTd = document.createElement("td");
        if (j == 0) {
          let newAnchorTag = document.createElement("a");
          newAnchorTag.setAttribute("href", members[i].url); //Crea atributo (link) dentro de <a>
          newAnchorTag.setAttribute("target", "_blank"); //Ejecutar link en pestaña adicional
          newAnchorTag.innerHTML = members[i][insertInfo];
          if (j == 0 && members[i].middle_name != null) {
            fullname = newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].middle_name} ${members[i].last_name}`;
          } else {
            newAnchorTag.innerHTML = `${newAnchorTag.innerHTML} ${members[i].last_name}`;
          }
          newTd.appendChild(newAnchorTag);
        } else {
          newTd.innerHTML = members[i][insertInfo];
        }
        newTr.appendChild(newTd);
      }
      tableBody.appendChild(newTr);
    }
  }
  if (filter1 == 0) {
    window.alert("Ooops! No results found for your criteria.\nPlease change your selection.")
    // document.getElementById('houseData2').innerHTML = "Ooops! No results found for your criteria.";
  }
}

//Filtros Tablas
$(document).ready(function() {
  $('#example').DataTable();
} );




