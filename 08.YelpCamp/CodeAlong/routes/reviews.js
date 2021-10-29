// ########################### require dependencies ##################

const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const Campground = require('../models/campground');
const { reviewSchema } = require('../schemas');

// ########################## middleware's ###########################

const validateReview = (req, res, next) => {
    // using joi - defining an joi schema
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};
// ########################## roots ##################################

router.post('/', validateReview, catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const camp = await Campground.findById(id);
        const newReview = new Review(req.body.review);
        camp.reviews.push(newReview);
        await newReview.save();
        await camp.save();
        req.flash('success', 'New review was added successfully!');
        res.redirect(`/campgrounds/${camp.id}`)
    }
));

router.delete('/:reviewId', catchAsync(
    async(req, res) => {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId);
        req.flash('success', 'Review delete - successful!');
        res.redirect(`/campgrounds/${id}`);
    }
))


module.exports = router;