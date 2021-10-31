const Campground = require('../models/campground');


const isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author._id.equals(req.user._id)) {
        req.flash('error', 'you do not have the required permission to edit this post!');
        return res.redirect(`/campgrounds/${id}`);
    };
    next();
};


module.exports = isAuthor;