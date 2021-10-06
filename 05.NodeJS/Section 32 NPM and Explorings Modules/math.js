const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;



// to use information from one script in others in node we need to export them and than require this script in other : 
//const { PI, square } = require('./math'); is one way to do it

exports.square = square;
exports.PI = PI;

// =========================
// module.exports.add = add;
// module.exports.PI = PI;
// module.exports.square = square;