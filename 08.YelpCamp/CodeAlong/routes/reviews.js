// ########################### require dependencies ##################
const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const Campground = require('../models/campground');

// ########################## middleware's ###########################
const validateReview = require('../utils/validateReview');
const checkIsLoggedIn = require('../utils/checkIsLoggedIn');
const catchAsync = require('../utils/catchAsync');

// ########################## roots ##################################

router.post('/', checkIsLoggedIn, validateReview, catchAsync(
    async(req, res) => {
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

router.delete('/:reviewId', checkIsLoggedIn, catchAsync(
    async(req, res) => {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId);
        req.flash('success', 'Review delete - successful!');
        res.redirect(`/campgrounds/${id}`);
    }
))


module.exports = router;