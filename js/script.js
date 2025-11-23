// Load the header HTML before cloning the site menu
$("#header").load("/header.html", function() {

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

    //Nested dropdown function - Mobile function could be tweaked to have nested dropdowns hide when the parent dropdown is hidden also
    if($(window).width() < 1024) {
        $(".has-children").click(function () {
            $(this).parent().parent().children('ul').slideToggle('medium');
        });
    } else {
        // First try, but very hard to use. Next iteration below.
        // $(".dropdown-item").hover(function () {
        //     $(this).children('ul').slideToggle('medium');
        // });

        // var subMenu = $('li.dropdown-item > ul > li.dropdown-item');

        // subMenu.hover(function () {
        //     $(this).find("ul.dropdown-item").slideToggle(200);
        // });

        // Next iteration here!
        $(".has-children").click(function () {
            $(this).parent().parent().children('ul').slideToggle('medium');
        });
    }
});

// Calculating years since a certain date (for About Me page)
function yearsSinceDate(dateString) {
  const now = new Date();
  const pastDate = new Date(dateString);
  let years = now.getFullYear() - pastDate.getFullYear();

  if (now.getMonth() < pastDate.getMonth() ||
      (now.getMonth() === pastDate.getMonth() && now.getDate() < pastDate.getDate())) {
    years--;
  }
  return years;
}
$(document).ready(function() {
  $('.date-count').each(function() {
    const dateString = $(this).data('date');
    const years = yearsSinceDate(dateString);
    $(this).text(years);
  });
});

// Resume categories between Outdoors and Tech/Customer Service
$("#outdoors").click(function () {
    $(".outdoors").slideToggle('medium');
    $(this).toggleClass("text-emerald-300");
});
$("#tech").click(function () {
    $(".tech").slideToggle('medium');
    $(this).toggleClass("text-emerald-300");
});

// Salve page dropdowns
$("#ogbutton").click(function () {
    $(".ogcontent").slideToggle('medium');
});
$("#tablemountainbutton").click(function () {
    $(".tablemountaincontent").slideToggle('medium');
});

// Make images in color only when they are entirely in the viewport on mobile only
$(window).on('scroll resize',
function() {
    if($(window).width() < 1024) {
        $('.color-scroll').each(function() {
            var element = $(this);
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