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
 *Funcion CRAER EQUIPO
 * newEquipo.localidadEquipo = document.getElementById("localidadEquipo").value;
 */
function validarDatosEquipo() {
  if (formulario.nombreEquipo.value == "") {
    console.log("Error en el almacenamiento");
  }
  const newEquipo = new Equipo();
  newEquipo.nombreEquipo = formulario.nombreEquipo.value;
  newEquipo.localidadEquipo = formulario.localidadEquipo.value;
  newEquipo.provinciaEquipo = formulario.provinciaEquipo.value;
  equipos.push(newEquipo);
  agregarFila(newEquipo);
}

/*
 *INSERTAR UN NUEVO REGISTO DE EQUIPO
 */
function agregarFila(equipo) {
  let padre = document.getElementById("datos");
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");

  td.innerHTML = index++;
  td1.innerHTML = equipo.nombreEquipo;
  td2.innerHTML = equipo.localidadEquipo;
  td3.innerHTML = equipo.provinciaEquipo;

  padre.appendChild(tr);
  padre.appendChild(td);
  padre.appendChild(td1);
  padre.appendChild(td2);
  padre.appendChild(td3);
}
/*
 *Declaracion de datos
 *obtencion de input de formulario
 */
const equipos = [];
// const formulario = document.forms["formEquipo"];

const formulario = document.getElementById("formEquipo");
const inputs = document.querySelectorAll("#formEquipo input");
const validarInputFormulario = (evento) => {
  switch (evento.target.name) {
    case "nombreEquipo":
      if (expresionCadena.test(evento.target.value)) {
        document.getElementById("nombreEquipo").classList.add("btn-danger");
      } else {
        document.getElementById("nombreEquipo");
      }
      break;
    case "localidadEquipo":
      console.log("hace algo");
      break;
    case "provinciaEquipo":
      console.log("hace algo");
      break;
  }
};
let index = 1;
const expresionCadena = /^[s-zA-Z0-9]{2,35}$/;

inputs.forEach((input) => {
  input.addEventListener("keyup", validarInputFormulario);
  input.addEventListener("blur", validarInputFormulario);
});
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  validarDatosEquipo();
  formulario.reset();
});
