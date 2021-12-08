class Corredor {
  constructor(nombreCorredor, edadCorredor, categoria, numeroCorredor, equipo) {
    this.nombreCorredor = nombreCorredor;
    this.edadCorredor = edadCorredor;
    this.categoria = categoria;
    this.numeroCorredor = numeroCorredor;
    this.equipo = equipo;
  }
  mostrarDatos() {
    console.warn("CARGA DE CORREDOR");
    console.log(this.nombreCorredor);
    console.log(this.edadCorredor);
    console.log(this.numeroCorredor);
    console.log(this.categoria);
    console.log(this.equipo);
  }
}

// function crearCorredor() {
//   const newCorredor = new Corredor();
//   return newCorredor;
// }
equipos = JSON.parse(localStorage.getItem("equipos"));
categorias = JSON.parse(localStorage.getItem("categorias"));

function cargarCategoria() {
  const categoriaSelected = $("#categoria");
  for (const categoria of categorias) {
    categoriaSelected.append(`<option>${categoria.nombreCategoria}</option>`);
    console.log(categoria);
  }
}

function cargarEquipo() {
  const equipoSelected = $("#equipos");
  for (const equipo of equipos) {
    equipoSelected.append(`<option>${equipo.nombreEquipo}</option>`);
  }
}

cargarEquipo();
cargarCategoria();
