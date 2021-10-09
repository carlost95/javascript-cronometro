class Categoria {
  constructor(nombreCategoria, rangoEdadMinima, rangoEdadMaxima, descripcion) {
    this.nombreCategoria = nombreCategoria;
    this.rangoEdadMinima = rangoEdadMinima;
    this.rangoEdadMaxima = rangoEdadMaxima;
    this.descripcion = descripcion;
  }
  mostrarDatos() {
    console.warn("CARGA DE CATEGORIA");
    console.log(this.nombreCategoria);
    console.log(this.rangoEdad);
    console.log(this.descripcion);
  }
}
function crearCategoria() {
  const newCategoria = new Categoria();
  newCategoria.nombreCategoria = prompt("Ingrese nombre de CATEGORIA");
  newCategoria.rangoEdad = prompt("Ingrese rango de edad");
  newCategoria.descripcion = prompt("Ingrese descripcion de categoria");
  return newCategoria;
}

const categoria = crearCategoria();
categoria.mostrarDatos();
