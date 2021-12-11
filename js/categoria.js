class Categoria {
  constructor(nombreCategoria, rangoEdadMinima, rangoEdadMaxima, descripcion) {
    this.nombreCategoria = nombreCategoria;
    this.rangoEdadMinima = rangoEdadMinima;
    this.rangoEdadMaxima = rangoEdadMaxima;
    this.descripcion = descripcion;
  }
}

function agregarCategoria() {
  const newCategoria = new Categoria();
  newCategoria.nombreCategoria = formulario.nombre.value;
  newCategoria.rangoEdadMinima = formulario.rangoMinimo.value;
  newCategoria.rangoEdadMaxima = formulario.rangoMaximo.value;
  newCategoria.descripcion = formulario.descripcion.value;

  categorias.push(newCategoria);

  const storageCtegoria = JSON.parse(localStorage.getItem("categorias")) || [];
  const todosCategorias = [...storageCtegoria, newCategoria];

  agregarFila(newCategoria);
  localStorage.setItem("categorias", JSON.stringify(todosCategorias));
}

/*
 *INSERTAR UN NUEVO REGISTO DE CATEGORIA EN EL HTML
 */
function agregarFila(categoria) {
  const tablaEquipos = $("#tablaCategorias");
  tablaEquipos.fadeIn(3000).append(`<tr>
  <td>${categoria.nombreCategoria}</td>
  <td>${categoria.rangoEdadMinima}</td>
  <td>${categoria.rangoEdadMaxima}</td>
  <td>${categoria.descripcion}</td>
  </tr>
  `);
}
function cargarCategiriasExistentes() {
  let categoriascargadas = JSON.parse(localStorage.getItem("categorias"));
  if (categoriascargadas != null && categoriascargadas.length != 0) {
    for (const eqp of categoriascargadas) {
      agregarFila(eqp);
    }
  } else {
    categoriascargadas = [];
  }
}
/*
 *DECLARACION DE ELEMENTOS A UTILIZAR
 */
const expresionCadena = {
  cadena: /^[a-zA-Z0-9/ /ñ]{2,20}$/,
  numero: /^[0-9]{1,2}$/,
};
const categorias = [];

// acceso para la validacion de input del formulario
const categoriaValido = {
  nombre: false,
  rangoMinimo: false,
  rangoMaximo: false,
};
/*
 *obtencion del formulario e inputs de formulario
 */
const formulario = document.getElementById("formCategoria");
const inputs = document.querySelectorAll("#formCategoria input");

/*
 *VALIDACION DE INPUT DEL FORMULARIO DE CATEGORIA
 */
const validarInputFormulario = (evento) => {
  switch (evento.target.name) {
    case "nombre":
      validarInputForm(expresionCadena.cadena, evento.target, "nombre");
      break;
    case "rangoMinimo":
      validarInputForm(expresionCadena.numero, evento.target, "rangoMinimo");

      break;
    case "rangoMaximo":
      validarInputForm(expresionCadena.numero, evento.target, "rangoMaximo");
      break;
  }
};

const validarInputForm = (expresion, input, idForm) => {
  if (expresion.test(input.value)) {
    document
      .querySelector(`#categoria__${idForm} .error__formulario`)
      .classList.remove("error__formulario--activo");
    categoriaValido[idForm] = true;
  } else {
    document
      .querySelector(`#categoria__${idForm} .error__formulario`)
      .classList.add("error__formulario--activo");
    categoriaValido[idForm] = false;
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
  if (
    categoriaValido.nombre &&
    categoriaValido.rangoMaximo &&
    categoriaValido.rangoMaximo
  ) {
    agregarCategoria();
    formulario.reset();
  }
});

cargarCategiriasExistentes();
