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
        $(".dropdown-item").hover(function () {
        $(this).children('ul').slideToggle('medium');
        });

        var subMenu = $('li.dropdown-item > ul > li.dropdown-item');

        subMenu.hover(function () {
            $(this).find("ul.dropdown-item").slideToggle(200);
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
  $('.date-element').each(function() {
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

// Photo gallery incompmlete alert
$(".photo-alert").each(function () {
    $(this).click(function () {
        alert("I'm still working on my photo gallery! Sign up for email updates on the 'Get Updates' tab if you'd like to know when they gallery goes up! :)"); 
    });
});

// Make images in color only when they are entirely in the viewport on mobile only
$(window).on('scroll resize', // Function to show a random climbing exercise every day on the Wild West page
$(document).ready(function() {

    function getDate() {
        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
        return date;
    }

    function getRandomItem(arr) {
        // Get a random index value
        //const randomIndex = Math.floor(Math.random() * arr.length);
        
        var date = getDate();
        // Use the date as a seed to get a random number
        var seededNum = new Math.seedrandom(date);
        // Multiply the random number to be a float large enough to choose among the items in the array 
        var randomIndex = seededNum() * (arr.length + 1);
        // Turn the float into an int
        var chosenOne = Math.trunc(randomIndex);

        // Return the random item
        return arr[chosenOne];
    }

    function randomLineGenerator(filePath) {
        var linesArray = [];

        $.get(filePath, function(data) {
            // Split the data by new lines and store in the array
            linesArray = data.split('\r\n');

            // Randomly choose an item from the array
            var randomItem = getRandomItem(linesArray);
            $("#climbing-exercise").replaceWith(randomItem);
        });
    }
    
    randomLineGenerator('resources/climbing-exercises.txt');
}),function() {
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