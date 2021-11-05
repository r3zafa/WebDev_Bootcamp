// ########################### defining User Schema ####################
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ########################### requiring Schema's ######################
const Review = require('./review');
// const User = require('./user');

// ########################### defining campground Schema ##############
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

// config for Campgroundschema
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: { type: String, required: [true, 'name cannot be blank'] },
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);



CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `
        <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
        <p>${this.description.substring(0,30)+'...'}</p>
    `
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