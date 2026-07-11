$("#month-title").click(function () {
  if ($(this).hasClass("text-white")) {
    $(this).removeClass("text-white");
    $(this).addClass("text-emerald-300");
    $("#day-title").removeClass("text-emerald-300");
    $("#day-title").addClass("text-white");
    $("#monthly-height").removeClass("hidden");
    $("#daily-height").addClass("hidden");
  }
});

$("#day-title").click(function () {
  if ($(this).hasClass("text-white")) {
    $(this).removeClass("text-white");
    $(this).addClass("text-emerald-300");
    $("#month-title").removeClass("text-emerald-300");
    $("#month-title").addClass("text-white");
    $("#daily-height").removeClass("hidden");
    $("#monthly-height").addClass("hidden");
  }
});