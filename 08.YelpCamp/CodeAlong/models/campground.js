// ########################### defining User Schema ####################
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ########################### requiring Schema's ######################
const Review = require('./review');
// const User = require('./user');

// ########################### defining campground Schema ##############
const CampgroundSchema = new Schema({
    title: { type: String, required: [true, 'name cannot be blank'] },
    price: Number,
    description: String,
    location: String,
    images: [{
        url: String,
        filename: String
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


// ########################### defining middleware's for Schema ##########
// .post or .pre for example
CampgroundSchema.post('findOneAndDelete', async function(doc) {
    // console.log(doc)
    await Review.deleteMany({
        _id: { $in: doc.reviews }
    })
})




module.exports = mongoose.model('Campground', CampgroundSchema);