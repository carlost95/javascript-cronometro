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
const equipos = [
  {
    id: 1,
    nombre: "trota",
  },
  {
    id: 2,
    nombre: "trota2",
  },
  {
    id: 3,
    nombre: "trota3",
  },
];

// function crearCorredor() {
//   const newCorredor = new Corredor();
//   return newCorredor;
// }
function cargarCategoria() {}

function cargarEquipo() {
  const equipoSelected = $("#equipos");
  for (const equipo of equipos) {
    equipoSelected.append(
      `<option value"${equipo.id}">${equipo.nombre}</option>`
    );
    console.log(equipo);
  }
}
