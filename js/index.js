/*
 TODO URLS PARA LLAMADAS LOCALES 
 */
const timer = new Timer();
const URL_EVENT = `http://localhost:3000/eventos`;
const URL_POSICIONES = "http://localhost:3000/posiciones"

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
  // timer.pause({ precision: "secondTenths" });
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
        cargarEventosExitentes();
        console.log(resp)
        dorsal.val("");
      });

  }
});


function agregarFila(evento) {
  const comprobacion: evento.categoriaCorredor;
  switch (comprobacion == 'Master A-Hombre') {
    case value:

      break;

    default:
      break;
  }
  const tablaData = $("#tablaCategoriaMasterAMujer");
  tablaData.fadeIn(3000).append(`<tr>
  <td>${evento.nombreCorredor}</td>
  <td>${evento.dorsalCorredor}</td>
  <td>${evento.time}</td>
  <td>${evento.categoriaCorredor}</td>
  <td>${evento.equipoCorredor}</td>
  </tr>
  `);
}

function cargarEventosExitentes() {
  $.get(URL_POSICIONES, function (response, estado) {
    if (estado === "success") {
      const data = response;
      const tablaData = $("#tablaCategoriaMasterAMujer").empty();
      for (const dt of data) {
        agregarFila(dt);
      }
    }
  });

}
cargarEventosExitentes();