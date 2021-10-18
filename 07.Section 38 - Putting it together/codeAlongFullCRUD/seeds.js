//###### {REQUIRING Models / dependencies for Database}
const mongoose = require('mongoose');
const Product = require('./models/product');

//###### {STARTING DBs} ############
const dbName = 'farmStand';
mongoose.connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
        console.log(dbName, 'Database is UP!');
    })
    .catch(err => {
        console.log(dbName, 'no response, more details:');
        console.log(err);
    });

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save()
//     .then( p => console.log(p))
//     .catch(err => console.log('ERROR:', err));

const seedProucts = [{
        name: 'Orange',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Apple',
        price: 2.99,
        category: 'fruit'
    },
    {
        name: 'carrot',
        price: 0.99,
        category: 'vegetable'
    },
    {
        name: 'Eggplanet',
        price: 1.09,
        category: 'vegetable'
    },
    {
        name: 'watermelon',
        price: 3.09,
        category: 'fruit'
    }
];
Product.insertMany(seedProucts)
    .then(p => console.log(p))
    .catch(err => console.log('ERROR:', err));