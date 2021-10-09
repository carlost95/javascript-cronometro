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

function crearCorredor() {
  const newCorredor = new Corredor();
  newCorredor.nombreCorredor = prompt("Ingrese nombre del Corredor");
  newCorredor.edadCorredor = prompt("Ingrese edad del Corredor");
  newCorredor.categoria = prompt("Ingrese categoria");
  newCorredor.numeroCorredor = prompt("Ingrese el dorsal del corredor");
  newCorredor.equipo = prompt("Ingrese equipo");
  return newCorredor;
}

const corredor = crearCorredor();
corredor.mostrarDatos();
