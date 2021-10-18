const mongoose = require('mongoose');

//##################{ CREATING SCHEMA and MODEL }####################
//#### {first -  defining some schema's to use thm later} ####
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    comments: [{ type: String }]
});

//#### {secondly - use schema's to build models} ##############
const Product = mongoose.model('Product', productSchema); //build collection

//#### {export information to use them in index.js} ###########
module.exports = Product;