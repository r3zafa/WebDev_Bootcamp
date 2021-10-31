const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const User = require('./user');

const CampgroundSchema = new Schema({
    title: { type: String, required: [true, 'name cannot be blank'] },
    price: Number,
    description: String,
    location: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});


CampgroundSchema.post('findOneAndDelete', async function(doc) {
    console.log(doc)
    await Review.deleteMany({
        _id: { $in: doc.reviews }
    })
})




module.exports = mongoose.model('Campground', CampgroundSchema);