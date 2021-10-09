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
function crearEquipo() {
  const newEquipo = new Equipo();
  newEquipo.nombreEquipo = formulario.nombreEquipo.value;
  newEquipo.localidadEquipo = formulario.localidadEquipo.value;
  newEquipo.provinciaEquipo = formulario.provinciaEquipo.value;
  equipos.push(newEquipo);
  insertarNuevaFila(newEquipo);
}

/*
 *INSERTAR UN NUEVO REGISTO DE EQUIPO
 */
function insertarNuevaFila(equipo) {
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
  // }
}

const equipos = [];
const formulario = document.forms["formEquipo"];
let index = 1;
