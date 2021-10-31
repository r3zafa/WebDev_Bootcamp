const { reviewSchema } = require('../schemas');
const ExpressError = require('../utils/ExpressError');

const validateReview = (req, res, next) => {
    // using joi - defining an joi schema
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    return next();
};


module.exports = validateReview;