const myMembers = data.results[0].members;
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
let tBody = document.getElementById("senateData");
var link = ["url"];
for (let i=0; i< myMembers.length; i++) {
  let newTr = document.createElement("tr");
    for  (let j=0; j< fieldsInserted.length; j++) {
      let dataInserted = fieldsInserted[j];
      let newTd = document.createElement("td");
      newTd.innerHTML = myMembers[i][dataInserted]
      if(dataInserted == "first_name"){
        newTd.onclick = function (){
          window.location.href = myMembers[i].url
        }
        newTd.classList.add('link')
      }
      if (j==0 && myMembers[i].middle_name != null) {
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].middle_name} ${myMembers[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].last_name}`;
      }
      newTr.appendChild(newTd);
    }
  tBody.appendChild(newTr);
}



//Filtros tablas
$(document).ready(function() {
  $('#example').DataTable();
} );
