// ########################## models #################################
const Review = require('../models/review');
const Campground = require('../models/campground');


module.exports.createReview = async(req, res) => {
    // information's
    const { id } = req.params;
    const userId = req.user._id;
    const reviewData = req.body.review;
    // await camp
    const camp = await Campground.findById(id);
    // make review
    const newReview = new Review(reviewData);
    newReview.author = userId;
    // save review in post
    camp.reviews.push(newReview);
    // save in db
    await newReview.save();
    await camp.save();
    // flash and redirect
    req.flash('success', 'New review was added successfully!');
    res.redirect(`/campgrounds/${camp.id}`)
};

module.exports.deleteReview = async(req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review delete - successful!');
    res.redirect(`/campgrounds/${id}`);
};