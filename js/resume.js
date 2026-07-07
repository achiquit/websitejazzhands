// Resume page dropdowns
$("#cefrbutton").click(function () {
    $("#cefrcontent").slideToggle('medium');
});

$(".reference").click(function () {
    $(this).next().slideToggle('medium');
    $(this).children().children().toggleClass("rotate-180");
})
$("#show-references").click(function () {
    if ($("#show-references").hasClass("tucked-away")) {
        $(this).siblings(".contact").removeClass('hidden');
        $(this).siblings(".reference").children().children().removeClass("rotate-180");
        $(this).removeClass('tucked-away');
    } else {
        $(this).siblings(".contact").addClass('hidden');
        $(this).siblings(".reference").children().children().addClass("rotate-180");
        $(this).addClass('tucked-away');
    }

})
// Resume page scroll to top
var toTopButton = document.getElementById("to-top-button");
// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function () {
    if ($(window).width() < 1024) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            toTopButton.classList.remove("hidden");
        } else {
            toTopButton.classList.add("hidden");
        }
    } else {

    }
}

// Timeline buttons
$(".timeline-btn").click(function(){
  $("#timeline").fadeToggle();
});

// ######## Hide items five years of age or older #############
var jobItems = [
    ["srmg", new Date("July 31, 2026 00:00:00").getTime()],
    ["nrocks", new Date("July 31, 2026 00:00:00").getTime()],
    ["qamaria", new Date("Mar 31, 2026 00:00:00").getTime()],
    ["citap", new Date("May 31, 2024 00:00:00").getTime()],
    ["apogee", new Date("Aug 31, 2023 00:00:00").getTime()],
    ["dbl", new Date("Jun 30, 2023 00:00:00").getTime()],
    ["uncits", new Date("Jul 31, 2021 00:00:00").getTime()],
    ["cellar", new Date("Jul 31, 2018 00:00:00").getTime()]
]

function hideFiveYrs(init, items) {
    console.log(init);
    let curDate = new Date();
    let fiveYrs = new Date(curDate);
    fiveYrs.setFullYear(fiveYrs.getFullYear() - 5);

    // Hide expired items
    for (let i = 0; i < items.length; i++) {
        var item = document.getElementById(items[i][0]);
        var exp = items[i][1]
        if (fiveYrs > exp) {
            if (init == 0) {
                console.log("Attempting to hide item " + items[i][0]);
                $(item).slideToggle();
            } else {
                item.classList.add("hidden");
            }
        }
    };
}

hideFiveYrs(1, jobItems);

$("#showHideJobs").click(function () {
    if ($(this).hasClass("show")) {
        console.log("Showing everything");
        let span = document.getElementById("showHideText");
        span.textContent = "Hide";
        $(this).removeClass("show");
        $(this).addClass("hide");
        for (let i = 0; i < jobItems.length; i++) {
            var item = document.getElementById(jobItems[i][0]);
            if ($(item).hasClass("hidden")) {
                $(item).slideToggle();
                $(item).addClass("block");
            }
        };
    } else {
        if ($(this).hasClass("hide")) {
            console.log("Hiding everything");
            let span = document.getElementById("showHideText");
            span.textContent = "Show";
            $(this).removeClass("hide");
            $(this).addClass("show");
            hideFiveYrs(0, jobItems);
        }
    }
});

// ######## Hide expired certs #############

var certs = [
    ["spi", new Date("Dec 25, 2026 00:00:00").getTime()],
    ["spg", new Date("Dec 25, 2026 00:00:00").getTime()],
    ["ymhfr", new Date("Apr 30, 2028 00:00:00").getTime()],
    ["cpr", new Date("Jan 29, 2028 00:00:00").getTime()]
]

// Get today's date and time
var now = new Date().getTime();

// Hide expired certs
for (let i = 0; i < certs.length; i++) {
    var cert = document.getElementById(certs[i][0]);
    var exp = certs[i][1]
    if (now > exp) {
        cert.classList.add("hidden");
    }
};