const timerInstance = new Timer();
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
});

timer.addEventListener("secondsUpdated", function (e) {
  $("#chronoExample .values").html(
    timer
      .getTimeValues()
      .toString(["hours", "minutes", "seconds", "secondTenths"])
  );
});

timer.addEventListener("secondTenthsUpdated", function (e) {
  $("#chronoExample .values").html(
    timer
      .getTimeValues()
      .toString(["hours", "minutes", "seconds", "secondTenths"])
  );
});

timer.addEventListener("reset", function (e) {
  $("#chronoExample .values").html(
    timer
      .getTimeValues()
      .toString(["hours", "minutes", "seconds", "secondTenths"])
  );
});
const reloj = $("#chronoExample .values");
console.log(reloj.timer.getTimeValues());
