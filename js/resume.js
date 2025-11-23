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