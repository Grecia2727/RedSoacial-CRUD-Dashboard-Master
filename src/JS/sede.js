// Variales globales:
let formSede;
let refSede;
let tbodyTablaSede;
const CREATEsede = "Insertar Sede";
const UPDATEsede = "Modificar Sede";
let modoSede = CREATEsede;
let refSedeAEditar;

function enviarSedeAFirebase(event) {
  event.preventDefault();
  switch (modoSede) {
    case CREATEsede:
      // Insertando datos de Sede, al FIrebase
      refSede.push({
        sedeNombre: event.target.sedeNombre.value,
        sedeUbicacion: event.target.sedeUbicacion.value,
        sedeSuministro: event.target.sedeSuministro.value,

      });
      break;

    case UPDATEsede:
      // Guardando o actualizando las Sede editadas, en Firebase
      refSedeAEditar.update({
        sedeNombre: event.target.sedeNombre.value,
        sedeUbicacion: event.target.sedeUbicacion.value,
        sedeSuministro: event.target.sedeSuministro.value

      });
      modoSede = CREATEsede;
      document.getElementById("btn-insertar-sede").value = CREATEsede;
      break;
  }
  // Despues de insertar y guardar los datos, Reseteamos (limpiamos) los campos del formulario
  formSede.reset();
}


// los datos que fueron insertados en Firebase, mostrarlos en la Tabla Diagnostico
const mostrarSedeDeFirebase = () => {
  refSede.on("value", function (snap) {
    let datos = snap.val();
    let filasSedeAMostrar = "";
    for (let key in datos) {
      let resultado        =  parseInt(datos[key].sedeSuministro) + parseInt(datos[key].sedeUbicacion)*2;
      filasSedeAMostrar += "<tr>" +
        "<td>" + datos[key].sedeNombre + "</td>" +
        "<td>" + datos[key].sedeUbicacion + "</td>" +
        "<td>" + datos[key].sedeSuministro + "</td>" +
        "<td>" + resultado + "</td>" +
        "<td> --- </td>" +
        "<td>" +
        '<button class="btn btn-danger blue darken-2 editarSede" onclick="editarSedeDeFirebase(this)" data-sede ="' + key + '">' +
        '<i class="far fa-edit"></i>'  +
        '</button>' +
        "</td>" +
        "<td>" +
        '<button class="btn btn-danger blue darken-2 borrar" onclick="borrarSedeDeFirebase(this)" data-sede ="' + key + '">' +
        '<i class="fas fa-trash-alt"></i>' +
        '</button>' +
        "</td>" +
        "<td>" +
        '<button class="btn btn-danger blue darken-2 completarInfo" onclick="completarInfoSedeDeFirebase(this)" >' +
        '<i class="fas fa-clipboard-list"></i>'             +
        '</button>' +
        "</td>" +
        "<td>" +
        '<button class="btn btn-danger blue darken-2 visualizarInfo" onclick="visualizarInfoSedeDeFirebase(this)"  >' +
        '<i class="fas fa-eye"></i>'  +
        '</button>' +
        "</td>" +
        "</tr>";
    }
    tbodyTablaSede.innerHTML = filasSedeAMostrar;
    if (filasSedeAMostrar != "") {
      let elementosEditablesSede = document.getElementsByClassName("editarSede");
      for (let i = 0; i < elementosEditablesSede.length; i++) {
        elementosEditablesSede[i].addEventListener("click", editarSedeDeFirebase, false);
      }

      let elementosBorrablesSede = document.getElementsByClassName("borrar");
      for (let i = 0; i < elementosBorrablesSede.length; i++) {
        elementosBorrablesSede[i].addEventListener("click", borrarSedeDeFirebase, false);
      }
    }
  });
}

const editarSedeDeFirebase = (e) => {
  let keySedeAEditar = e.getAttribute("data-sede");
  refSedeAEditar = refSede.child(keySedeAEditar);
  refSedeAEditar.once("value", function (snap) {
    let datos = snap.val();
    document.getElementById("sede-nombre").value = datos.sedeNombre;
    document.getElementById("sede-ubicacion").value = datos.sedeUbicacion;
    document.getElementById("sede-suministro").value = datos.sedeSuministro;
  });
  document.getElementById("btn-insertar-sede").value = UPDATEsede;
  modoSede = UPDATEsede;
}

const borrarSedeDeFirebase = (e) => {
  let keySedeABorrar = e.getAttribute("data-sede");
  let refSedeABorrar = refSede.child(keySedeABorrar);
  refSedeABorrar.remove();
}

const inicializarSede = () => {
  formSede = document.getElementById("form-sede");
  tbodyTablaSede = document.getElementById("tbody-tabla-sede");
  formSede.addEventListener("submit", enviarSedeAFirebase, false);
  refSede = firebase.database().ref().child("RegistroDeSedePorEmpresa");
  mostrarSedeDeFirebase();
}

window.onload = inicializarSede;


// =======================================================
// ================== GRAFICO MORRIS  ====================
const morris1 = new Morris.Line({
  element: 'graphSedeMiConsumo',
  data: [
    { year: '2015', value: 5 , ahorro: 10 },
    { year: '2016', value: 10, ahorro: 14 },
    { year: '2017', value: 15, ahorro: 17 },
    { year: '2018', value: 35, ahorro: 22 },
    { year: '2019', value: 20, ahorro: 28 }
  ],
  xkey: 'year',
  ykeys: ['value', 'ahorro'],
  lineWidth: 1,
  resize: true,
  labels: ['consumo', 'ahorro'],
  lineColors: ['#C14d9f', '#2CB4AC'],
});

const btnActualizarGrafico = document.getElementById("btn-actualiza-graph");
btnActualizarGrafico.addEventListener("click", function(){
  console.log(morris1);

  var nuevaData = [
    { year: '2017', value: 20 , ahorro: 05 },
    { year: '2018', value: 13, ahorro: 25 },
    { year: '2019', value: 08, ahorro: 0 },
    { year: '2020', value: 17, ahorro: 11 },
    { year: '2021', value: 10, ahorro: 20 }
  ];
  morris1.setData( nuevaData );
});
