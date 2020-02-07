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
var myMembers = data.results[0].members;
let fieldsInserted = ["first_name", "party", "state", "seniority", "votes_with_party_pct"];
let tBody = document.getElementById("houseData"); //Se incrustará en la id houseData de la tabla (tbody)

function createTable() {
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
      if (j==0 && myMembers[i].middle_name != null) {   //condicional para buscar si el congresista tiene middle_name. En caso de que este sea null, mostrará un espacio vacío.
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].middle_name} ${myMembers[i].last_name}`;
      } else if (j==0) {
        newTd.innerHTML = `${newTd.innerHTML} ${myMembers[i].last_name}`;
      }
      newTr.appendChild(newTd); //añade el TD a TR
    }
  tBody.appendChild(newTr); //añade el TR al Tbody (tabla) Los appendChild son necesarios para mostrar los valores en el HTML
}
}
createTable();


//Filtros Tablas
$(document).ready(function() {
  $('#example').DataTable();
} );



function canISeeTheMember(myMembers){
    
  var partyFilter = false;
  var stateFilter = false;
  
  //We store the values of the checkboxes that are checked i.e ["R", "D"]
  var arrayOfCheckedCheckboxes = [];
  
  //We populate the array with an R if the Rep Cb is checked
  if(document.getElementById("R").checked){
      arrayOfCheckedCheckboxes.push("R");
  }
  
  if(document.getElementById("D").checked){
      arrayOfCheckedCheckboxes.push("D");
  }
  
  if(document.getElementById("I").checked){
      arrayOfCheckedCheckboxes.push("I");
  }
  for (let i = 0; i < myMembers.length; i++){
  if(arrayOfCheckedCheckboxes.includes(myMembers.party) || arrayOfCheckedCheckboxes.length == 0){
      partyFilter = true;
  }

  
  if(document.getElementById("stateSelect").value == myMembers.state || document.getElementById("stateSelect").value == "all"){
      stateFilter = true;
  
}
  
  
  return partyFilter && stateFilter;

}
}

document.getElementById("R").addEventListener("click", function () {
  createTable(myMembers);
})

document.getElementById("D").addEventListener("click", function () {
   createTable();
})

document.getElementById("I").addEventListener("click", function () {
   createTable();
})

document.getElementById("stateSelect").addEventListener("change", function () {
   createTable();
})
  






$(document).ready(function(){ 
//    $(window).scroll(function(){ 
//        if ($(this).scrollTop() > 100) { 
//            $('#scroll').fadeIn(1000); 
//        } else { 
//            $('#scroll').fadeOut(1000); 
//        } 
//    }); 
  $('#scroll').click(function(){ 
      $("html, body").animate({ scrollTop: 0 }, 600); 
      return false; 
  }); 
});