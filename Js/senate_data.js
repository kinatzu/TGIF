const hMembers = data.results[0].members;

//Datos a mostrar en la tabla
createTable(hMembers, ["D", "R", "I"]);

//Evenlistener checkboxes
let checkBoxGroup = document.getElementsByName("filter");
checkBoxGroup.forEach(checkbox => checkbox.addEventListener("click", () => filters()))

function filters() {
  let checkBoxFilters = Array.from(document.querySelectorAll('input[name=filter]:checked')).map(array => array.value);
  createTable(hMembers, checkBoxFilters)
}


//Creación tabla con miembros
function createTable(members, filter1) {
  senateData.innerHTML = "";

  let tableBody = document.getElementById("senateData");
  let membersinfo = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];

  for (let i = 0; i < members.length; i++) {
    if (filter1.includes(members[i].party) || filter1.length < 1) {
      let newTr = document.createElement("tr");
      for (let j = 0; j < membersinfo.length; j++) {
        let insertInfo = membersinfo[j];
        let newTd = document.createElement("td");
        if (j == 0) {
          let newAnchorTag = document.createElement("a");
          newAnchorTag.setAttribute("href", members[i].url);
          newAnchorTag.setAttribute("target", "_blank");
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
}

//Filtros Tablas
$(document).ready(function() {
  $('#example').DataTable();
} );








// const myMembers = data.results[0].members;
// let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
// let tBody = document.getElementById("senateData");
// var link = ["url"];
// for (let i=0; i< myMembers.length; i++) {
//   let newTr = document.createElement("tr");
//     for  (let j=0; j< fieldsInserted.length; j++) {
//       let dataInserted = fieldsInserted[j];
//       let newTd = document.createElement("td");
//       newTd.innerHTML = myMembers[i][dataInserted]
//       if(dataInserted == "first_name"){
//         newTd.onclick = function (){
//           window.location.href = myMembers[i].url
//         }
//         newTd.classList.add('link')
//       }
//       if (j==0 && myMembers[i].middle_name != null) {
//         newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].middle_name} ${myMembers[i].last_name}`;
//       } else if (j==0) {
//         newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].last_name}`;
//       }
//       newTr.appendChild(newTd);
//     }
//   tBody.appendChild(newTr);
// }



// //Filtros tablas
// $(document).ready(function() {
//   $('#example').DataTable();
// } );
