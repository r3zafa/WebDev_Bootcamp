let days = ['monday', 'tuesday', 'wednesday'];
days.length; //3

let arrayOfDifferent = [NaN, true, 12, 9.99, false, null, 'hi guys'];

let arrayOfDifferent2 = [NaN, true, 12, 9.99, false, null, 'hi guys', [1, 2, 3, 4, 5]];


arrayOfDifferent[1]; // second element from array
arrayOfDifferent[6][6]; // s from hi guys
arrayOfDifferent2[7][1]; // 2 from inner array


let colors = ['red', 'orange', 'yellow'];
colors[2] = 'blue';
colors; // outcome is  ["red", "orange", "blue"] and one element will be change.
colors[1] = 1;
colors; // outcome is  ["red", 1, "blue"] element type can be changed as well
colors[6] = 54;
colors; // outcome is  (7) ["red",1, "blue", empty × 3, 54];


// array methods push, pop, shift, unshift and more
let colors = ['red', 'orange', 'yellow'];
colors.push('blue'); // ["red", "orange", "yellow", "blue"]
colors.pop(); // ["red", "orange", "yellow"]
colors.push('blue', 'black', 'pink'); //["red", "orange", "yellow", "blue", "black", "pink"]


let code = ['binary', 'c', 'c#', 'py'];
code.shift(); // binary is removed. ["c", "c#", "py"]
let nextOutPut = code.shift(); // save removed element from array to var

code.unshift('kotlin'); //["kotlin", "c", "c#", "py"] kotlin is added


// other array methods concat, includes, indexOf, join, reverse, slice, splice, sort

// concat. add to array and form a new array
let R = [1, 2, 3];
let A = [4, 5, 6];
let newArray = R.concat(A); //  [1, 2, 3, 4, 5, 6]

// includes method check if something exist and return true or false.
R.includes(2); // true
A.includes(2); // false

// indexOf return the index of elements.
R.indexOf(2); // 1
let arr2 = ['ali', ['reza', 'mohammad', 'nafas'], 'mostafa'];
arr2.indexOf('nafas'); // -1
arr2.indexOf('mostafa'); // 2

// reverse. reverse is distractive and change the input array as well output
let arr3 = arr2.reverse();
// arr3: ["mostafa", Array(3), "ali"]; // arr2: ["mostafa", Array(3), "ali"];


// slice make a copy of portion of any array
let colors2 = ['red', 'orange', 'yellow', 'black', 'blue', 'pink', 'gray'];
colors2.slice(0, 3); // ["red", "orange", "yellow"]
colors2.slice(4, 5); // ["blue"]
colors2.slice(2); // ["yellow", "black", "blue", "pink", "gray"]
colors2.slice(-3); // ["blue", "pink", "gray"]

// splice method splice(start,delete,add)

let colors3 = ['red', 'orange', 'yellow', 'black', 'blue', 'pink', 'gray', 'violet'];
colors3.splice(5, 1); // ["pink"] is deleted : ["red", "orange", "yellow", "black", "blue", "gray", "violet"]
colors3.splice(5, 0, 'pink'); // ["red", "orange", "yellow", "black", "blue", "pink", "gray", "violet"]
colors3.splice(5, 0, 'red-orange'); // ["red", "orange", "yellow", "black", "blue", "red-orange", "pink", "gray", "violet"]


// sort, toString, reduce, filter, ... in cdn