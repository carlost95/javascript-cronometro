class Categoria {
  constructor(nombreCategoria, rangoEdadMinima, rangoEdadMaxima, genero) {
    this.nombreCategoria = nombreCategoria;
    this.rangoEdadMinima = rangoEdadMinima;
    this.rangoEdadMaxima = rangoEdadMaxima;
    this.genero = genero;
  }
}

function agregarCategoria() {
  const newCategoria = new Categoria();
  const indexGenero = document.formCategoria.genero.selectedIndex;
  const nombreGenero = document.formCategoria.genero.options[indexGenero].text;

  newCategoria.nombreCategoria = formulario.nombre.value;
  newCategoria.rangoEdadMinima = formulario.rangoMinimo.value;
  newCategoria.rangoEdadMaxima = formulario.rangoMaximo.value;
  newCategoria.genero = nombreGenero;

  categorias.push(newCategoria);
  this.postData("http://localhost:3000/categorias", newCategoria)
    .done(function (resp) {
      console.log(resp)
    });
  agregarFila(newCategoria); //AGREGAR UNA FILA EN LA TABLA
}

function postData(url = "", data = {}) {
  return $.ajax({
    url,
    type: "POST",
    data: JSON.stringify(data),
    dataType: "json",
    contentType: "application/json"
  })
}


function cargarCategoriasExistentes() {
  $.getJSON(`http://localhost:3000/categorias`, function (response, estado) {
    if (estado === "success") {
      const categorias = response;
      for (const cat of categorias) {
        agregarFila(cat);
      }
    }
  })
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
  <td>${categoria.genero}</td>
  </tr>
  `);
}
/*
 ?DECLARACION DE ELEMENTOS A UTILIZAR
 */
const categorias = [];
const expresionCadena = {
  cadena: /^[a-zA-Z0-9/ /ñ]{2,20}$/,
  numero: /^[0-9]{1,2}$/,
};

/*
TODO acceso para la validacion de input del formulario 
*/
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
  if (categoriaValido.nombre &&
    categoriaValido.rangoMaximo &&
    categoriaValido.rangoMaximo
  ) {
    agregarCategoria();
    formulario.reset();
  }
});

cargarCategoriasExistentes();