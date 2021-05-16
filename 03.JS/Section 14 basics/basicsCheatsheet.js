// Numbers:
1; -
99;
0.345345;

//--------------------- Math operations: + - * / % **
2 + 3;
2 - 1;
3 * 5.5;
2 / 5;
19 % 4; //3
3 + 1 * 9; //12
(3 + 1) * 9; //36
2 ** 4; //16

// NaN : Not a Nummber
0 / 0; //NaN
1 + NaN; //NaN

// ------------------ find the Type of Variable -----------------
typeof 4; //"number"
typeof ali; //"undefined"
typeof NaN; //"number" !!!

//-------------------- Making variables with let:
let numberOfFriends = 1;
let Reza = 3;
let ali = 1;
ali + Reza; //4
Reza + 1; //4
let total_sum = Reza + ali; //total_sum=4

//--------------------- Incrementing and dec...:
numberOfFriends += 3; //numberOfFriends is now 4
numberOfFriends -= 3; //numberOfFriends is now 2
numberOfFriends--; //1
numberOfFriends++; //2

// ------------------- Variables with const
const minimumAge = 21; //CANNOT REASSIGN!
//old way to make variable: var [name] = [num];

//--------------------- Booleans - true or false values
true;
false;
let isHappy = true;

//---------------------- Naming Conventions
// Use upper camel-cased names:
let numberOfChickens = 6; //GOOD
// NOT THE JS WAY:
// let number_of_chickens = 6;