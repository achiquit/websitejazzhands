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

    function randomSongGenerator(filePath, target, chosenSongs) {
        var songs = [];

        $.get(filePath, function(data) {
            // Split the data by new lines and store in the array
            songs = data.split('\n');

            if (chosenSongs.length === songs.length) {
                chosenSongs.length = 0;
            };

            // Randomly choose an item from the array that has not already been chosen in the current session
            var randomItem = Math.floor(Math.random() * songs.length);
            while (chosenSongs.includes(randomItem)) {
                var randomItem = Math.floor(Math.random() * songs.length);
            };

            chosenSongs.push(randomItem);

            $(target).replaceWith(`<span id="song">${songs[randomItem]}</span>`);
            console.log(chosenSongs);
        });
    }

    var chosenSongs = [];
    
    randomLineGenerator('/resources/wild-west/techniques.txt', '#technique');
    randomLineGenerator('/quotes.txt', '#quote');
    randomLineGenerator('/resources/wild-west/favorite_videos.txt', '#vid');
    randomSongGenerator('/resources/wild-west/songs.txt', '#song', chosenSongs);

    $("#song-button").click(function () {
        randomSongGenerator('/resources/wild-west/songs.txt', '#song', chosenSongs);
    });
});