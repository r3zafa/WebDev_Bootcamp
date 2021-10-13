// ##################{ CONNECTING }####################
const mongoose = require('mongoose');
const dbName = 'shopApp';
mongoose.connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
        console.log('connected to db:', dbName);
    })
    .catch(err => {
        console.log(dbName, 'refused connection, more info ...');
        console.log(err);
    });

// ##################{ mongoose schema validation }####################
// ###### required,
const productSchema = new mongoose.Schema({
    //using long syntax to describe properties: example: instead of qty: Number we can use {type: Number,required: true, etc.}
    // this syntax allow us to add additional information
    name: {
        type: String,
        required: true

    },
    price: {
        type: Number
    },

})

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: 'Mountain bike', price: 599 });
bike.save()
    .then(data => {
        console.log('saved')
        console.log(data);
    })
    .catch(err => console.log('ERROR:', err));

// output:
//     saved
// {
//   name: 'Mountain bike',
//   price: 599,
//   _id: new ObjectId("616703d9107572ae46888e30"),
//   __v: 0
// }

// const bike = new Product({ price: 599 });
// bike.save()
//     .then(data => {
//         console.log('saved')
//         console.log(data);
//     })
//     .catch(err => console.log('ERROR:', err));
//output: 
//   _message: 'Product validation failed'
// if we do not fulfill the requirement we cannot create the new product.