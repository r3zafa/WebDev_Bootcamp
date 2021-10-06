const jokes = require("give-me-a-joke");
const colors = require("colors");
const cowSays = require('cowsay')
    // to check and see if package is included we can use console.dir
    // console.dir(jokes)

jokes.getRandomDadJoke(function(joke) {
    console.log(joke.rainbow); // added .rainbow make output text colorful
});

console.log(cowSays.say({
    text: "I'm a module".red,
    e: "oO".blue,
    T: "U ".green
}));