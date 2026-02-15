// Function to show a random line from a txt file every day
$(document).ready(function() {

    function getDate() {
        var nowDate = new Date(); 
        var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
        return date;
    }

    function getRandomItem(arr) {
        
        var date = getDate();
        // Use the date as a seed to get a random number
        var seededNum = new Math.seedrandom(date);
        // Multiply the random number to be a float large enough to choose among the items in the array 
        var randomIndex = seededNum() * (arr.length - 1);
        // Turn the float into an int
        var chosenOne = Math.trunc(randomIndex);
        // Return the random item
        return arr[chosenOne];
    }

    function randomLineGenerator(filePath, target) {
        var linesArray = [];

        $.get(filePath, function(data) {
            // Split the data by new lines and store in the array
            linesArray = data.split('\n');

            // Randomly choose an item from the array
            var randomItem = getRandomItem(linesArray);
            $(target).replaceWith(randomItem);
        });
    }
    
    randomLineGenerator('/quotes.txt', '#quote');
});