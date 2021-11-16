// class Corredor {
//   constructor(nombreCorredor, edadCorredor, categoria, numeroCorredor, equipo) {
//     this.nombreCorredor = nombreCorredor;
//     this.edadCorredor = edadCorredor;
//     this.categoria = categoria;
//     this.numeroCorredor = numeroCorredor;
//     this.equipo = equipo;
//   }
//   mostrarDatos() {
//     console.warn("CARGA DE CORREDOR");
//     console.log(this.nombreCorredor);
//     console.log(this.edadCorredor);
//     console.log(this.numeroCorredor);
//     console.log(this.categoria);
//     console.log(this.equipo);
//   }
// }

// function crearCorredor() {
//   const newCorredor = new Corredor();
//   return newCorredor;
// }
equipos = JSON.parse(localStorage.getItem("equipos"));
console.log(equipos);
cargarEquipo();
function cargarCategoria() {}

function cargarEquipo() {
  const equipoSelected = $("#equipos");
  for (const equipo of equipos) {
    equipoSelected.append(`<option ">${equipo.nombreEquipo}</option>`);
    console.log(equipo);
  }
}

$("#idReloj");
/*
 *Tomar el tiempo que se encuentra en el momento desde
 *la pantalla de inicio del cronometro
 */
