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

/*
 * consultas API REST de Provincias y localidades
 */
const URLAPI = " https://apis.datos.gob.ar/georef/api/provincias";

function obtenerProvincias() {
  console.log("carga de provincias");
  const provSelect = $("#provincia");
  $.getJSON(URLAPI, function (response, estado) {
    if (estado === "success") {
      const provincias = response.provincias;
      for (const items of provincias) {
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
  const munSelect = $("#localidad");
  $("#localidad").html("");
  $.getJSON(URLAPIMUNI, function (response, estado) {
    if (estado === "success") {
      const localidades = response.municipios;
      for (const local of localidades) {
        munSelect.append(`<option value=${local.id}>${local.nombre}</option>`);
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
  let indexProv = document.formEquipo.provinciaSelect.selectedIndex;
  let indexLoc = document.formEquipo.localidadSelect.selectedIndex;

  newEquipo.nombreEquipo = formulario.nombre.value;
  newEquipo.provinciaEquipo = formulario.provincia.options[indexProv].text;
  newEquipo.localidadEquipo = formulario.localidad.options[indexLoc].text;
  equipos.push(newEquipo);
  localStorage.setItem("equipos", JSON.stringify(equipos));
  agregarFila(newEquipo);
}

/*
 *INSERTAR UN NUEVO REGISTO DE EQUIPO EN EL HTML
 */
function agregarFila(equipo) {
  const tablaEquipos = $("#tablaEquipos");
  tablaEquipos.fadeIn(3000).append(`<tr>
  <td>${equipo.nombreEquipo}</td>
  <td>${equipo.provinciaEquipo}</td>
  <td>${equipo.localidadEquipo}</td>
  </tr>
  `);
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
  console.log("Muestra");
  console.warn(evento.target.value);
  switch (evento.target.name) {
    case "nombre":
      validarInputForm(expresionCadena, evento.target, "nombre");
      break;
    case "provincia":
      validarInputFormSelect(evento.target, "provincia");
      break;
    case "localidad":
      validarInputFormSelect(evento.target, "localidad");

      break;
  }
};
const validarInputFormSelect = (input, idSelect) => {
  console.log(input);
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
  console.error(
    "valores de equipo -->",
    equipoValido.nombre,
    equipoValido.localidad,
    equipoValido.provincia
  );
  if (
    equipoValido.nombre &&
    !equipoValido.localidad &&
    !equipoValido.provincia
  ) {
    agregarEquipo();
    formulario.reset();
  }
});
obtenerProvincias();

/*
 *funcionalidad de metodos de ordenamiento
 */
