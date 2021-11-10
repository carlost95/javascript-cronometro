/*
 *Declaracion de clases
 */
class Equipo {
  constructor(nombreEquipo, localidadEquipo, provinciaEquipo) {
    this.nombreEquipo = nombreEquipo;
    this.localidadEquipo = localidadEquipo;
    this.provinciaEquipo = provinciaEquipo;
  }
  mostrarDatos() {
    console.log("CARGA DE EQUIPO");
    console.log("Nombre: " + this.nombreEquipo + " ");
    console.log("Localidad: " + this.localidadEquipo + " ");
    console.log("Provincia: " + this.provinciaEquipo);
  }
}
/*
 *METODO DE ORDENAMIENTO SORT
 */
function pruebaEquipoSort() {
  let equipo1 = new Equipo("Espectro", "Chilecito", "La Rioja");
  equipos.push(equipo1);
  let equipo2 = new Equipo("Trotas", "Chilecito", "La Rioja");
  equipos.push(equipo2);
  let equipo3 = new Equipo("Agilas", "Chilecito", "La Rioja");
  equipos.push(equipo3);
}
/*
 *METODO DE COMPARACION
 */
function compareTo(a, b) {
  if (a.nombreEquipo > b.nombreEquipo) {
    return 1;
  }
  if (a.nombreEquipo < b.nombreEquipo) {
    return -1;
  }
  return 0;
}
/*
 * consultas API REST de Provincias y localidades
 */
const URLAPI = " https://apis.datos.gob.ar/georef/api/provincias";

function obtenerProvincias() {
  const provSelect = $("#provincia");
  $.getJSON(URLAPI, function (response, estado) {
    if (estado === "success") {
      const provincias = response.provincias;
      for (const items of provincias) {
        // console.log(items.nombre);
        provSelect.append(`<option value=${items.id}>${items.nombre}</option>`);
      }
    }
  });
}
/*
 *Funcion carga de municipios  al select localidad
 */
$("#provincia").change((event) => {
  const idProvincia = event.target.value;
  const URLAPIMUNI = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProvincia}&campos=id,nombre&max=100`;
  cargarMinicipio(URLAPIMUNI);
});

function cargarMinicipio(URLAPIMUNI) {
  console.log("entre");
  const munSelect = $("#localidad");
  $("#localidad").html("");
  $.getJSON(URLAPIMUNI, function (response, estado) {
    if (estado === "success") {
      const localidades = response.municipios;
      for (const local of localidades) {
        munSelect.append(`<option ">${local.nombre}</option>`);
        // console.log("Municipios");console.log(local.nombre);
      }
    }
  });
}
/*
 *Funcion CREAR EQUIPO
 * newEquipo.localidadEquipo = document.getElementById("localidadEquipo").value;
 */
function agregarEquipo() {
  const newEquipo = new Equipo();
  newEquipo.nombreEquipo = formulario.nombre.value;
  newEquipo.localidadEquipo = formulario.localidad.value;
  newEquipo.provinciaEquipo = formulario.provincia.value;
  equipos.push(newEquipo);
  localStorage.setItem("equipos", JSON.stringify(equipos));
  agregarFila(newEquipo);
}

/*
 *INSERTAR UN NUEVO REGISTO DE EQUIPO EN EL HTML
 */
function agregarFila(equipo) {
  let padre = document.getElementById("tablaEquipos");
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");

  td.innerHTML = equipo.nombreEquipo;
  td1.innerHTML = equipo.localidadEquipo;
  td2.innerHTML = equipo.provinciaEquipo;

  padre.appendChild(tr);
  padre.appendChild(td);
  padre.appendChild(td1);
  padre.appendChild(td2);
}
/*
 *DECLARACION DE ELEMENTOS A UTILIZAR
 */
const expresionCadena = /^[a-zA-Z0-9/ /ñ]{2,30}$/;
const equipos = [];

// acceso para la validacion de input del formulario
const equipoValido = {
  nombre: false,
  localidad: false,
  provincia: false,
};
/*
 *obtencion del formulario e inputs de formulario
 */
const formulario = document.getElementById("formEquipo");
const inputs = document.querySelectorAll("#formEquipo input");

/*
 *VALIDACION DE INPUT DEL FORMULARIO DE EQUIPO
 */
const validarInputFormulario = (evento) => {
  switch (evento.target.name) {
    case "nombre":
      validarInputForm(expresionCadena, evento.target, "nombre");
      break;
    case "localidad":
      validarInputForm(expresionCadena, evento.target, "localidad");

      break;
    case "provincia":
      validarInputForm(expresionCadena, evento.target, "provincia");
      break;
  }
};

const validarInputForm = (expresion, input, idForm) => {
  if (expresion.test(input.value)) {
    document
      .querySelector(`#equipo__${idForm} .error__formulario`)
      .classList.remove("error__formulario--activo");
    equipoValido[idForm] = true;
  } else {
    document
      .querySelector(`#equipo__${idForm} .error__formulario`)
      .classList.add("error__formulario--activo");
    equipoValido[idForm] = false;
  }
};
/*
 *CONTROL DE EVENTOS EN LOS INPUT DEL FORMULARIO
 */
inputs.forEach((input) => {
  input.addEventListener("keyup", validarInputFormulario);
  input.addEventListener("blur", validarInputFormulario);
});

/*
 *AGREGADO DE EVENTLISTENER
 */
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (equipoValido.nombre && equipoValido.localidad && equipoValido.provincia) {
    agregarEquipo();
    formulario.reset();
  }
});
/*
 *funcionalidad de metodos de ordenamiento
 */

obtenerProvincias();
pruebaEquipoSort();
// console.log(equipos.sort(compareTo));
