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

//Bloque declarando todas las variables y datos necesarios
const myMembers = data.results[0].members;
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
let tBody = document.getElementById("houseData"); //Se incrustará en la id houseData de la tabla

for (let i=0; i< myMembers.length; i++) {  // iniciamos 1er loop para coger todos los miembros
  let newTr = document.createElement("tr"); //crea variable nueva que crea el TR
    for  (let j=0; j< fieldsInserted.length; j++) { //Loop para coger todos los datos necesarios de cada miembro
      let dataInserted = fieldsInserted[j]; //Nueva variable con todos los datos ya cogidos por el loop con condición J
      let newTd = document.createElement("td"); //creamos variable nueva que crea el TD
      newTd.innerHTML = myMembers[i][dataInserted] //introducimos en el HTML (inner) los valores (dataInserted) de todos los miembros (myMembers[i])
      if(dataInserted == "first_name"){
        newTd.onclick = function (){ //función para añadir el link a cada nombre
          window.location.href = myMembers[i].url //poniendo .url a myMembers[i] añade el atributo ''url'' del JS a todo el loop de miembros. 
        }
        newTd.classList.add('link') //crea dentro del TD una clase con el link para que no aparezca este a parte.
      }
      if (j==0 && myMembers[i].middle_name != null) {
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].middle_name} ${myMembers[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].last_name}`;
      }
      newTr.appendChild(newTd); //añade el TD a TR
    }
  tBody.appendChild(newTr); //añade el TR al Tbody (tabla) Los appendChild son necesarios para mostrar los valores en el HTML
}


//Filtros Tablas
$(document).ready(function() {
  $('#example').DataTable();
} );
