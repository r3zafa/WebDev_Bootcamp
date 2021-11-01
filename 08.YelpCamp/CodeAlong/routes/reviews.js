// ########################### require dependencies ##################
const express = require('express');
const router = express.Router({ mergeParams: true });

// ########################## controller #############################
const reviewController = require('../controllers/reviews');

// ########################## middleware's ###########################
const validateReview = require('../utils/validateReview');
const checkIsLoggedIn = require('../utils/checkIsLoggedIn');
const catchAsync = require('../utils/catchAsync');
const isReviewAuthor = require('../utils/isReviewAuthor');

// ########################## routes #################################
// #### send reviews
router.post('/', checkIsLoggedIn, validateReview, catchAsync(reviewController.createReview));
// #### remove reviews
router.delete('/:reviewId', checkIsLoggedIn, isReviewAuthor, catchAsync(reviewController.deleteReview))

// #### export router
module.exports = router;