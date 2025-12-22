// COUNTDOWN CODE

// Set the date we're counting down to
var countDownDateStart = new Date("Jan 7, 2026 00:00:00").getTime();
var countDownDateEnd = new Date("Jan 21, 2026 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distanceStart = countDownDateStart - now;
    var distanceEnd = countDownDateEnd - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distanceStart / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distanceStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Display the result in the element

    if (distanceStart > 0) {
        document.getElementById("countdown").innerHTML = "Countdown until my next adventure: " + days + "d " + hours + "h ";
    } else {
        // Display text if I'm actively on an adventure
        if (distanceEnd > 0) {
            document.getElementById("countdown").innerHTML = "I'm on an adventure right now! I'll write about it soon :)";
        } else {
            document.getElementById("countdown").innerHTML = "I'm either writing up a recent adventure, planning my next adventure, or both! Stay tuned (:"
        }
    }
}, 1000);

// END COUNTDOWN CODE

