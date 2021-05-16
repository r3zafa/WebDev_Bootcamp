// ------------------ Making StringsS
let color = "purple";

// ------------------ Single quotes work too:
let city = 'Tokyo';
city + city; //TokyoTokyo
1 + city; //1Tokyo
//------------------- Strings have a length:
city.length; //5
//------------- strings and arrays are indexed
//------------- We can access specific characters using their index:
city[0]; //'T'
city[3]; //'y'

// ------------------- String methods:
// ------------------- Strings.[method()];
'hello'.toUpperCase(); // "HELLO";
'LOL'.toLowerCase(); // "lol"
'    omg  '.trim(); // "omg"
'    reza  '.trim().toUpperCase(); //REZA

// -------------------- String methods with arguments:
'    Reza'.search('R');
//indexOf returns the index where the character is found (or -1 if not found)
'spider'.indexOf('i'); //2
'vesuvius'.indexOf('u'); //3 - only returns FIRST matching index
'cactus'.indexOf('z'); //-1 not found

// --------------------- slice - returns a "slice" of a string
"pancake".slice(3); //"cake" - slice from index 3 onwards
"pancake".slice(0, 3); //"pan" - slice from index 0 up to index 3
'cactus'.slice(-2); //us, backward

// --------------------- replace 
// --------- returns a new string, with the FIRST match replaced
"pump".replace("p", "b"); //"bump" - only replaces first "p"
//---------------------- repeat
"pump".repeat(10); // "pumppumppumppumppumppumppumppumppumppump"


//----------------------Exercise:-------------------
// DON'T TOUCH THIS LINE! (please)
const word = "skateboard"; //Don't change this line!

// YOUR CODE BELOW THIS LINE:
let facialHair = word.slice(5).replace("o", "e");
//----------------------------------------------------

// ------------------------------ String Template Literals
// Use backtick characters, NOT SINGLE QUOTES!

const color = "olive green";
const msg = `My favorite color is: ${color}` //"My favorite color is: olive green"

const str = `There are ${60 * 60 * 24} seconds in a day` //"There are 86400 seconds in a day"


//----------------- example----------------
let product = "Car";
let price = "100000";
let qty = "2";
const msg = `You have bought ${qty} x ${product} and you have to pay ${price*2}€`;
msg; // "You have bought 2 x Car and you have to pay 200000€"

//----------------- Random Numbers and the math object -------------------
Math; // you can see availible options
Math.PI;
Math.round(4.9);
Math.random(); //?!
Math.floor(Math.random() * 3) + 1; // random number between 1 and 3
Math.floor(23.33333333333); //23
Math.ceil(23.44444); //24

//------------- example -----------------------------
// NO TOUCHING! (please)
const die1 = Math.floor(Math.random() * 6) + 1; //random number from 1-6
const die2 = Math.floor(Math.random() * 6) + 1; //random number from 1-6

// YOUR CODE BELOW THIS LINE:
let roll = `You rolled a ${die1} and a ${die2}. They sum to ${die1 + die2}`