const timer = new Timer();

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

const dorsal = $("#numero").keypress(function (evento) {
  if (evento.keyCode == 13) {
    console.log(
      "ingreso " +
        timer
          .getTimeValues()
          .toString(["hours", "minutes", "seconds", "secondTenths"])
    );
    console.log(dorsal.val());
    dorsal.val("");
  }
});
