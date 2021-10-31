const { campgroundSchema } = require('../schemas');
const ExpressError = require('./ExpressError');

const validateCampground = (req, res, next) => {
    // using joi - defining an joi schema
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};

module.exports = validateCampground;