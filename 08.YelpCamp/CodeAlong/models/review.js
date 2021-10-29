const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: {
        type: String,
        required: [true, 'you must put some Text here!']
    },
    rating: Number
});

module.exports = mongoose.model('Review', reviewSchema);