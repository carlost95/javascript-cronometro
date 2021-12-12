/*
 TODO URLS PARA LLAMADAS LOCALES 
 */
const timer = new Timer();
const URL_EVENT = `http://localhost:3000/eventos`;
const URL_POSICIONES = "http://localhost:3000/posiciones"
const URL_CATEGORIAS = "http://localhost:3000/categorias"

$("#chronoExample .startButton").click(function () {
  try {
    timer.start({
      precision: "secondTenths"
    });
  } catch (e) {
    console.log("error tonto" + timer.getTimeValues());
  }
});

$("#chronoExample .pauseButton").click(function () {
  timer.pause({
    precision: "secondTenths"
  });
});

$("#chronoExample .stopButton").click(function () {
  timer.stop({
    precision: "secondTenths"
  });
});

$("#chronoExample .resetButton").click(function () {
  timer.stop({
    precision: "secondTenths"
  });
  timer.start({
    precision: "secondTenths"
  });
});

timer.addEventListener("secondTenthsUpdated", function (e) {
  $("#chronoExample .values").html(
    timer
    .getTimeValues()
    .toString(["hours", "minutes", "seconds", "secondTenths"])
  );
});

const postData = (url = "", data = {}) => {
  return $.ajax({
    url,
    type: "POST",
    data: JSON.stringify(data),
    dataType: "json",
    contentType: "application/json"
  })
}

const dorsal = $("#numero").keypress(function (evento) {
  const dorsalVal = dorsal.val();
  if (evento.keyCode == 13 && dorsalVal.length > 0) {
    const time = timer.getTimeValues().toString(["hours", "minutes", "seconds", "secondTenths"]);
    const data = {
      dorsal: dorsalVal,
      time
    }
    postData(URL_EVENT, data)
      .done(function (resp) {
        cargarPosicionesMujer();
        cargarPosicionesHombres();
        crearTablasCategorias();
        dorsal.val("");
      });

  }
});


function agregarFila(evento, tabla) {
  tabla.fadeIn(3000).append(`<tr>
  <td>${evento.nombreCorredor}</td>
  <td>${evento.dorsalCorredor}</td>
  <td>${evento.time}</td>
  <td>${evento.categoriaCorredor}</td>
  <td>${evento.equipoCorredor}</td>
  </tr>
  `);
}

function cargarPosicionesHombres() {
  $.get(URL_POSICIONES + '/Hombre', function (response, estado) {
    if (estado === "success") {
      const data = response;
      const tablaData = $("#tablaGeneralHombre").empty();
      for (const dt of data) {
        agregarFila(dt, tablaData);
      }
    }
  });
}

function cargarPosicionesMujer() {
  $.get(URL_POSICIONES + '/Mujer', function (response, estado) {
    if (estado === "success") {
      const data = response;
      const tablaData = $("#tablaGeneralMujer").empty();
      for (const dt of data) {
        agregarFila(dt, tablaData);
      }
    }
  });
}

function cargarPorCategoria(categoriaId) {
  $.get(URL_POSICIONES + '/categoria/' + categoriaId, function (response, estado) {
    if (estado === "success") {
      const data = response;
      const tablaData = $(`#${categoriaId}`).empty();
      for (const dt of data) {
        agregarFila(dt, tablaData);
      }
    }
  });
}

function crearTablasCategorias() {
  $.get(URL_CATEGORIAS, function (response, estado) {
    if (estado === "success") {
      const data = response;
      const tablaCategoria = $("#tablasCategoria").empty();
      data.forEach(categoria => {
        tablaCategoria.append(`
          <div class="container mt-4">
            <h2 class="section__titulo section__titulo--variante-categorias">Posiciones categoria ${categoria.nombreCategoria} - ${categoria.genero}</h2>
            <hr class="section__hr section__hr--titulo">
            <table class="table table-danger table-hover table-striped">
            <thead>
              <tr>
              <th scope="col">Posicion</th>
                <th scope="col">Nombre</th>
                <th scope="col">Dorsal</th>
                <th scope="col">Tiempo</th>
                <th scope="col">Categoria</th>
                <th scope="col">Equipo</th>
              </tr>
            </thead>
            <tbody id="${categoria.id}">
            </tbody>
          </table>
          </div>
        `)
        cargarPorCategoria(categoria.id);
      })
    }
  });
}



cargarPosicionesHombres();
cargarPosicionesMujer();
crearTablasCategorias();