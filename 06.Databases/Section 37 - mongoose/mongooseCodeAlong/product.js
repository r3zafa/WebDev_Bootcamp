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
        required: true,
        maxlength: 20 // to define a maximum length

    },
    price: {
        type: Number,
        required: true, // is an option
        default: 0,
        //min: 10,
        min: [0, 'price must be greater than 0'], // we can add inline error massages
        max: 1999

    },
    onSale: {
        type: Boolean,
        required: false,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L'] // is a sort of validation that check the input against defined values
    }

})


// ##################{ mongoose defining instances }####################
// instances have to be defined, before creating models from schema
// defining model instance in mongoose
productSchema.methods.greet = function() {
    console.log("#################### Hello!");
    console.log(`#################### from - ${this.name} `);
}


productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat);
    return this.save();
}

// ##################{ mongoose adding statics }####################
productSchema.statics.fireSale = function() {
    return this.updateMany({}, { onSale: true, price: 0 })
}




const Product = mongoose.model('Product', productSchema);
// if you add data that are not defined in schema there will be ignored and they will not be added to db 
// const bike = new Product({ name: 'E-bikes en', price: 1929, categories: ['bike', 'electric bike'] });
// bike.save()
//     .then(data => {
//         console.log('following data was saved to', dbName, 'as you see under:')
//         console.log(data);
//     })
//     .catch(err => console.log('ERROR:', err));

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



// Product.findOneAndUpdate({ name: 'Mountain bike' }, { price: -10 }, { new: true })
//     .then(data => {
//         console.log('following data was saved to', dbName, 'as you see under:')
//         console.log(data);
//     })
//     .catch(err => console.log('ERROR:', err));


// a big flow with validating in mongoose ist that they dont work as we want to update 
// objects. for example as example above we can update the price to be out of min/max range 
// and it will be added to db.

// if you want your data to be validate as you updating it. 
// you will be need to use [runValidators:true] option as you updating an object. like this:


// Product.findOneAndUpdate({ name: 'Mountain bike' }, { price: 1 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log('following data was saved to', dbName, 'as you see under:')
//         console.log(data);
//     })
//     .catch(err => console.log('ERROR:', err));


// enum test - see the description in schema
// const bike = new Product({ name: 'Cycling Jersey', price: 30, categories: ['Cycling'], size: 'S' });
// bike.save()
//     .then(data => {
//         console.log('following data was saved to', dbName, 'as you see under:')
//         console.log(data);
//     })
//     .catch(err => console.log('ERROR:', err));

// test instances - first try!
// const p = new Product({ name: 'test', price: 10 });
// p.save()
//     .then(data => {
//         console.log('following data was saved to', dbName, 'as you see under:')
//         console.log(data);
//     })
//     .catch(err => console.log('ERROR:', err));
// p.greet();

// test instances - 2. try!
// const findProduct = async() => {
//     const foundProduct = await Product.findOne({ name: 'Mountain bike' });
//     foundProduct.greet();
//     console.log(foundProduct);
//     await foundProduct.toggleOnSale();
//     await foundProduct.addCategory('reduced')
//     await foundProduct.addCategory('sport')
//     console.log('\n ############\n after change \n ############# \n', foundProduct);

// }

// findProduct()

// testing statics - statics are affecting entire collection
// Product.fireSale().then(res => console.log(res))