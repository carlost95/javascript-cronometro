const timer = new Timer();
const URL_EVENT = `http://localhost:3000/eventos`;

$("#chronoExample .startButton").click(function () {
  try {
    timer.start({ precision: "secondTenths" });
  } catch (e) {
    console.log("error tonto" + timer.getTimeValues());
  }
});

$("#chronoExample .pauseButton").click(function () {
  timer.pause({ precision: "secondTenths" });
});

$("#chronoExample .stopButton").click(function () {
  timer.stop({ precision: "secondTenths" });
});

$("#chronoExample .resetButton").click(function () {
  timer.stop({ precision: "secondTenths" });
  timer.start({ precision: "secondTenths" });
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
        console.log(resp)
        dorsal.val("");
    });
    
  }
});



