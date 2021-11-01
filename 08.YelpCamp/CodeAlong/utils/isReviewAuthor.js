const Review = require('../models/review');

const isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author._id.equals(req.user._id)) {
        req.flash('error', 'you do not have the required permission to delete this review!');
        return res.redirect(`/campgrounds/${id}`);
    };
    next();
};


module.exports = isReviewAuthor;