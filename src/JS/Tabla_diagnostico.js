// Variales globales:
let formDiagnostico;
let refDiagnostico;
let tbodyTablaDiagnostico;
const CREATE = "Insertar datos";
const UPDATE = "Modificar datos";
let modo = CREATE;
let refDiagnosticoAEditar;

function enviarDiagnosticoAFirebase(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      // Insertando datos, al FIrebase
      refDiagnostico.push({
        moduloTipogrifo: event.target.moduloTipogrifo.value,
        moduloUnidades: event.target.moduloUnidades.value,
        moduloTipouso: event.target.moduloTipouso.value,
        moduloCaudal: event.target.moduloCaudal.value
      });
      break;

    case UPDATE:
      // Guardando o actualizando los datos editados, en Firebase
      refDiagnosticoAEditar.update({
        moduloTipogrifo: event.target.moduloTipogrifo.value,
        moduloUnidades: event.target.moduloUnidades.value,
        moduloTipouso: event.target.moduloTipouso.value,
        moduloCaudal: event.target.moduloCaudal.value
      });
      modo = CREATE;
      document.getElementById("btn-insertar-diagnostico").value = CREATE;
      break;
  }
  // Despues de insertar y guardar los datos, Reseteamos (limpiamos) los campos del formulario
  formDiagnostico.reset();
}


// los datos que fueron insertados en Firebase, mostrarlos en la Tabla Diagnostico
const mostrarDiagnosticoDeFirebase = () => {
  refDiagnostico.on("value", function (snap) {
    let datos = snap.val();
    let filasDiagnosticoAMostrar = "";
    
    for (let key in datos) {
      
      filasDiagnosticoAMostrar += "<tr>" +
        "<td>" + datos[key].moduloTipogrifo + "</td>" +
        "<td>" + datos[key].moduloUnidades + "</td>" +
        "<td>" + datos[key].moduloTipouso + "</td>" +
        "<td>" + datos[key].moduloCaudal + "</td>" +
        "<td>  + (`moduloUnidades + moduloCaudal`)  + </td>" +
        "<td> --- </td>" +
        "<td>" +
        '<button class="btn btn-danger blue darken-2 editar" onclick="editarDiagnosticoDeFirebase(this)" data-diagnostico ="' + key + '">' +
        '<ion-icon src="../IMG/write.svg" size="small"></ion-icon>' +
        '</button>' +
        "</td>" +
        "<td>" +
        '<button class="btn btn-danger blue darken-2 borrar" onclick="borrarDiagnosticoDeFirebase(this)" data-diagnostico ="' + key + '">' +
        '<ion-icon src="../IMG/trash.svg" size="small"></ion-icon>' +
        '</button>' +
        "</td>" +
        "</tr>";
    }
    tbodyTablaDiagnostico.innerHTML = filasDiagnosticoAMostrar;
    if (filasDiagnosticoAMostrar != "") {
      let elementosEditablesDiagnostico = document.getElementsByClassName("editar");
      for (let i = 0; i < elementosEditablesDiagnostico.length; i++) {
        elementosEditablesDiagnostico[i].addEventListener("click", editarDiagnosticoDeFirebase, false);
      }

      let elementosBorrablesDiagnostico = document.getElementsByClassName("borrar");
      for (let i = 0; i < elementosBorrablesDiagnostico.length; i++) {
        elementosBorrablesDiagnostico[i].addEventListener("click", borrarDiagnosticoDeFirebase, false);
      }
    }
  });
}

const editarDiagnosticoDeFirebase = (e) => {
  let keyDiagnosticoAEditar = e.getAttribute("data-diagnostico");
  refDiagnosticoAEditar = refDiagnostico.child(keyDiagnosticoAEditar);
  refDiagnosticoAEditar.once("value", function (snap) {
    let datos = snap.val();
    document.getElementById("modulo-tipogrifo").value = datos.moduloTipogrifo;
    document.getElementById("modulo-unidades").value = datos.moduloUnidades;
    document.getElementById("modulo-tipouso").value = datos.moduloTipouso;
    document.getElementById("modulo-caudal").value = datos.moduloCaudal;
  });
  document.getElementById("btn-insertar-diagnostico").value = UPDATE;
  modo = UPDATE;
}

const borrarDiagnosticoDeFirebase = (e) => {
  let keyDiagnosticoABorrar = e.getAttribute("data-diagnostico");
  let refDiagnosticoABorrar = refDiagnostico.child(keyDiagnosticoABorrar);
  refDiagnosticoABorrar.remove();
}

const inicializarDiagnostico = () => {
  formDiagnostico = document.getElementById("form-diagnostico");
  tbodyTablaDiagnostico = document.getElementById("tbody-tabla-diagnostico");

  formDiagnostico.addEventListener("submit", enviarDiagnosticoAFirebase, false);
  refDiagnostico = firebase.database().ref().child("diagnostico");
  mostrarDiagnosticoDeFirebase();
}

window.onload = inicializarDiagnostico;
