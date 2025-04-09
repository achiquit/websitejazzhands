// For opening the full views of the images
$(".small-img").click(function () {
    $(this).next('.big-img').fadeToggle('slow');
});

$(".big-img").click(function () {
    $(this).fadeToggle('slow');
})

// In color on scroll 
$(window).on('scroll resize',
    function() {
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
    });

// Photo filter buttons
$("#everything").click(function () {
    if ($(this).hasClass('text-white')) {
        $(".filter").removeClass("text-emerald-300");
        $(".filter").addClass("text-white");
        $(this).removeClass("text-white");
        $(this).addClass("text-emerald-300");
        $(".photo").addClass("hidden");
        $(".photo").removeClass("hidden");
    }
})

$("#blackandwhite").click(function () {
    if ($(this).hasClass('text-white')) {
        $(".filter").removeClass("text-emerald-300");
        $(".filter").addClass("text-white");
        $(this).removeClass("text-white");
        $(this).addClass("text-emerald-300");
        $(".photo").addClass("hidden");
        $(".blackandwhite").removeClass("hidden");
    }
})

$("#color").click(function () {
    if ($(this).hasClass('text-white')) {
        $(".filter").removeClass("text-emerald-300");
        $(".filter").addClass("text-white");
        $(this).removeClass("text-white");
        $(this).addClass("text-emerald-300");
        $(".photo").addClass("hidden");
        $(".color").removeClass("hidden");
    }
})

$("#landscape").click(function () {
    if ($(this).hasClass('text-white')) {
        $(".filter").removeClass("text-emerald-300");
        $(".filter").addClass("text-white");
        $(this).removeClass("text-white");
        $(this).addClass("text-emerald-300");
        $(".photo").addClass("hidden");
        $(".landscape").removeClass("hidden");
    }
})

$("#action").click(function () {
    if ($(this).hasClass('text-white')) {
        $(".filter").removeClass("text-emerald-300");
        $(".filter").addClass("text-white");
        $(this).removeClass("text-white");
        $(this).addClass("text-emerald-300");
        $(".photo").addClass("hidden");
        $(".action").removeClass("hidden");
    }
})

$("#wildlife").click(function () {
    if ($(this).hasClass('text-white')) {
        $(".filter").removeClass("text-emerald-300");
        $(".filter").addClass("text-white");
        $(this).removeClass("text-white");
        $(this).addClass("text-emerald-300");
        $(".photo").addClass("hidden");
        $(".wildlife").removeClass("hidden");
    }
})