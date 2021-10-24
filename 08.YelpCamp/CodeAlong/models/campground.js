const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: { type: String, required: [true, 'name cannot be blank'] },
    price: Number,
    description: String,
    location: String,
    image: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);