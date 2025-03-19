// Load the header HTML before cloning the site menu
$("#header").load("header.html");

// Hamburger menu to X animation
const toggleMenu = document.querySelector('#toggleMenu');
toggleMenu.onclick = () => {
  toggleMenu.classList.toggle("hamburger-toggle");
};

// Mobile tile color scroll function

$(window).on('scroll resize', function() {
    var element = $('#test'); // Replace '#yourElement' with the actual selector
    var elementTop = element.offset().top;
    var elementBottom = elementTop + element.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    if (elementTop >= viewportTop && elementBottom <= viewportBottom) {
        // The element is fully visible
        element.removeClass("grayscale");
        console.log('Element is fully visible');
        console.log(element);
        // Perform actions when the element is fully visible
    } else {
        // The element is not fully visible
        element.addClass("grayscale");
        console.log('Element is not fully visible');
        // Perform actions when the element is not fully visible
    }
}); 