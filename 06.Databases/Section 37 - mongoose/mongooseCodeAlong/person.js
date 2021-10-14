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
const personSchema = new mongoose.Schema({
    //using long syntax to describe properties: example: instead of qty: Number we can use {type: Number,required: true, etc.}
    // this syntax allow us to add additional information
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['W', 'M', 'D']
    },

});

// virtual's in mongoose take actions on Schema's
personSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`
})

// defining middleware for mongoose
personSchema.pre('save', async function() {
    console.log('About to save!!')
})

personSchema.post('save', async function() {
    console.log('just saved!!')
})
const Person = mongoose.model('Person', personSchema);

// const tammy = new Person({ firstName: 'tammy', lastName: 'duck', gender: 'M' });
// tammy.save()
//     .then(data => {
//         console.log('following data was saved to', dbName, 'as you see under:')
//         console.log(data);
//     })
//     .catch(err => console.log('ERROR:', err));

// const fullName = tammy.fullName;
// console.log('------------', fullName, '----------------')


// const reza = new Person({ firstName: 'Reza', lastName: 'Faraji', gender: 'M' });
// reza.save();
//result:
// About to save!!
// connected to db: shopApp
// just saved!!