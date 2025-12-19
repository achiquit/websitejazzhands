// COUNTDOWN CODE

// Set the date we're counting down to
var countDownDate = new Date("Jan 7, 2026 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Display the result in the element
    document.getElementById("countdown-desk").innerHTML = "Countdown until my next adventure: " + days + "d " + hours + "h ";
    document.getElementById("countdown-mobile").innerHTML = "Countdown until my next adventure: " + days + "d " + hours + "h ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown-desk").innerHTML = "I'm on an adventure right now! I'll write about it soon :)";
        document.getElementById("countdown-mobile").innerHTML = "I'm on an adventure right now! I'll write about it soon :)";
    }
}, 1000);

// END COUNTDOWN CODE

