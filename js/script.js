// Load the header HTML before cloning the site menu
$("#header").load("header.html");

// Hamburger menu to X animation
const toggleMenu = document.querySelector('#toggleMenu');
toggleMenu.onclick = () => {
  toggleMenu.classList.toggle("hamburger-toggle");
};

// Mobile nav menu toggle
document.getElementById("toggleMenu").addEventListener("click", function () {
    const navMenu = document.getElementById("navMenu");
    if (navMenu.classList.contains("hidden")) {
        // Show the menu
        navMenu.classList.remove("hidden", "opacity-0", "scale-95");
        navMenu.classList.add("opacity-100", "scale-100");
        main.classList.add("blur-sm");
    } else {
        // Hide the menu
        navMenu.classList.add("opacity-0", "scale-95");
        navMenu.classList.remove("opacity-100", "scale-100");
        setTimeout(() => {
            navMenu.classList.add("hidden");
        }, 600); // Match the duration of the transition
        main.classList.remove("blur-sm");
    }
});

// Nested dropdown function (.has-children for button elements in dropdowns) - WIP ADAPTATION FOR DESKTOP AS WELL
if($(window).width() < 1024) {
    $(".has-children").map(function () {
    console.log("please");
      $(this).on("click", function (event) {
        var hiddenContent = $(event.target.parentNode.parentNode.nextElementSibling);
        $(hiddenContent).toggleClass("hidden");
        console.log("I clicked!");
      });
    });
} else {
    console.log("Ya, it's desktop bro");
    $(".dropdown-item").map(function () {
        $(this).hover(function() {
            console.log("Hovering!");
            var hiddenContent = $(event.target.parentNode.nextElementSibling);
            console.log(hiddenContent);
            $(hiddenContent).removeClass("hidden");
        }, function(){
            var hiddenContent = $(event.target.parentNode.nextElementSibling);
            $(hiddenContent).addClass("hidden");
        });
    });
}

// Nested dropdown function (.has-children for button elements in dropdowns) - mobile & desktop click function
//$(".has-children").map(function () {
//  $(this).on("click", function (event) {
//    var hiddenContent = $(event.target.parentNode.parentNode.nextElementSibling);
//    $(hiddenContent).toggleClass("hidden");
//  });
//});

// Make tiles in color only when they are entirely in the viewport on mobile only
$(window).on('scroll resize', function() {
    if($(window).width() < 1024) {
        $('.tile').each(function() {
            var element = $(this); // Replace '#yourElement' with the actual selector
            var elementTop = element.offset().top;
            var elementBottom = elementTop + element.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementTop >= viewportTop && elementBottom <= viewportBottom) {
                // The element is fully visible
                element.removeClass("grayscale");
            } else {
                // The element is not fully visible
                element.addClass("grayscale");
            }
        });
    }
});