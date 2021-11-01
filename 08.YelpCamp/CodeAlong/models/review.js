// ########################### require dependencies ####################
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ########################### defining review Schema ##################
const reviewSchema = new Schema({
    rating: Number,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});






module.exports = mongoose.model('Review', reviewSchema);