class Corredor {
  constructor(nombreCorredor, edadCorredor, dniCorredor, dorsalCorredor, categoriaCorredor, equipoCorredor) {
    this.nombreCorredor = nombreCorredor;
    this.edadCorredor = edadCorredor;
    this.dniCorredor = dniCorredor;
    this.dorsalCorredor = dorsalCorredor;
    this.categoriaCorredor = categoriaCorredor;
    this.equipoCorredor = equipoCorredor;
  }
}
/*
?Obtencion de los archivos locales
TODO cargas desde las entidades categorias y equipos
*/
const URLCATEGORIA = "http://localhost:3000/categorias";
const URLEQUIPO = "http://localhost:3000/equipos";
const URLCORREDOR = "http://localhost:3000/corredores";
let categoriaId = '';
let equipoId = '';

function cargarCategoria() {
  const categoriaSelected = $("#categoria");
  $.getJSON(URLCATEGORIA, function (response, estado) {
    if (estado === "success") {
      const categorias = response;
      for (const cat of categorias) {
        categoriaSelected.append(`<option value=${cat.id}>${cat.nombreCategoria}-${cat.genero}</option>`);
      }
    }
  });
}

function cargarEquipo() {
  const equipoSelected = $("#equipo");
  $.getJSON(URLEQUIPO, function (response, estado) {
    if (estado === "success") {
      const equipos = response;
      for (const equipo of equipos) {
        equipoSelected.append(`<option value=${equipo.id}>${equipo.nombreEquipo}</option>`);
      }
    }
  });
}

function cargarCorredoresExistentes() {
  $.getJSON(URLCORREDOR, function (response, estado) {
    if (estado === "success") {
      const corredores = response;
      for (const corredor of corredores) {
        agregarFila(corredor);
      }
    }
  })
}

/*
 TODO Funcion CREAR corredor
 */
function agregarCorredor() {
  const newCorredor = new Corredor();
  const indexProv = document.formCorredor.categoria.selectedIndex;
  const indexLoc = document.formCorredor.equipo.selectedIndex;
  const categoriaCorredor = formulario.categoria.options[indexProv].text;
  const equipoCorredor = formulario.equipo.options[indexLoc].text;

  newCorredor.nombreCorredor = formulario.nombre.value;
  newCorredor.edadCorredor = formulario.edad.value;
  newCorredor.dniCorredor = formulario.dni.value;
  newCorredor.dorsalCorredor = formulario.dorsal.value;
  newCorredor.categoriaCorredor = categoriaCorredor;
  newCorredor.equipoCorredor = equipoCorredor;
  newCorredor.equipoId = this.equipoId;
  newCorredor.categoriaId = this.categoriaId;

  corredores.push(newCorredor);

  this.postData(URLCORREDOR, newCorredor)
    .done(function (resp) {
      console.log(resp)
    });

  agregarFila(newCorredor);
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

/*
 TODO INSERTAR UN NUEVO REGISTO DE EQUIPO EN EL HTML
 */
function agregarFila(corredor) {
  const tablaEquipos = $("#tablaCorredor");
  tablaEquipos.fadeIn(3000).append(`<tr>
  <td>${corredor.nombreCorredor}</td>
  <td>${corredor.edadCorredor}</td>
  <td>${corredor.dniCorredor}</td>
  <td>${corredor.dorsalCorredor}</td>
  <td>${corredor.categoriaCorredor}</td>
  <td>${corredor.equipoCorredor}</td>
  </tr>
  `);
}



/* 
 ?DECLARACION DE ELEMENTOS A UTILIZAR
*/
const expresionCadena = {
  cadena: /^[a-zA-Z0-9/ /ñ]{2,40}$/,
  dni: /^[0-9]{7,8}$/,
  numero: /^[0-9]{1,4}$/,
};
let corredoresCargados = [];
let corredores = [];

/*
 !acceso para la validacion de input del formulario
 */
const corredorValido = {
  nombre: false,
  edad: false,
  dni: false,
  dorsal: false,
  categoria: false
};
/*
 ?VALIDACION DE SELECT EN LOS FORMULARIOS CON FUNCIONES
 */
const validarInputFormSelect = (idForm) => {
  let provForm = document.forms["formCorredor"][idForm].selectedIndex;
  if (provForm != 0) {
    document
      .querySelector(`#corredor__${idForm} .error__formulario`)
      .classList.remove("error__formulario--activo");
    corredorValido[idForm] = true;
  } else {
    document
      .querySelector(`#corredor__${idForm} .error__formulario`)
      .classList.add("error__formulario--activo");
    corredorValido[idForm] = false;
  }
};
/*
 ?VALIDACION DE INPUT EN LOS FORMULARIOS CON FUNCIONES
 */
const validarInputForm = (expresion, input, idForm) => {
  if (expresion.test(input.value)) {
    document
      .querySelector(`#corredor__${idForm} .error__formulario`)
      .classList.remove("error__formulario--activo");
    corredorValido[idForm] = true;
  } else {
    document
      .querySelector(`#corredor__${idForm} .error__formulario`)
      .classList.add("error__formulario--activo");
    corredorValido[idForm] = false;
  }
};

const formulario = document.getElementById("formCorredor");
const inputs = document.querySelectorAll("#formCorredor input");
const selections = document.querySelectorAll("#formCorredor select");
/*
!VALIDACION INPUT DE LOS FORMULARIOS
*/
const validarInputFormularioCorredor = (evento) => {
  switch (evento.target.name) {
    case "nombre":
      validarInputForm(expresionCadena.cadena, evento.target, "nombre");
      break;
    case "edad":
      validarInputForm(expresionCadena.numero, evento.target, "edad");
    case "dni":
      validarInputForm(expresionCadena.dni, evento.target, "dni");
      break;
    case "dorsal":
      validarInputForm(expresionCadena.numero, evento.target, "dorsal");
      break;
    case "categoria":
      validarInputFormSelect("categoria");
      break;
  }
};

/*
 *CONTROL DE EVENTOS EN LOS INPUT DEL FORMULARIO
 */
inputs.forEach((input) => {
  input.addEventListener("keyup", validarInputFormularioCorredor);
  input.addEventListener("blur", validarInputFormularioCorredor);
});
selections.forEach((select) => {
  select.addEventListener("click", validarInputFormularioCorredor);
  select.addEventListener("keyup", validarInputFormularioCorredor);
});
/*
 ?AGREGADO DE EVENTLISTENER
 */
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  console.log(corredorValido.categoria + "corredor");
  if (corredorValido.nombre && corredorValido.edad &&
    corredorValido.dni && corredorValido.dorsal &&
    corredorValido.categoria) {
    agregarCorredor();
    formulario.reset();
  }
});


$("#categoria").change((event) => {
  this.categoriaId = event.target.value;
});

$("#equipo").change((event) => {
  this.equipoId = event.target.value;
});

cargarCorredoresExistentes();
cargarEquipo();
cargarCategoria();