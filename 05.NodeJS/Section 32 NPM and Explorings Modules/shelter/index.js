// as we require a directory with an index.js in. node will check it to require exports


const blue = require('./blue')
const sadie = require('./sadie')
const janet = require('./janet')

const allCats = [blue, sadie, janet]

module.exports = allCats;