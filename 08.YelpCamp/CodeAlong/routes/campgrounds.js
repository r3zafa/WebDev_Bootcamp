// ########################### require dependencies ##################
const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas');

// ########################## middleware #############################
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
// ########################## roots ###################################
// #### campgrounds main pag
router.get('/', catchAsync(
    async(req, res, next) => {
        const title = 'Campgrounds';
        const camps = await Campground.find({});
        res.render('campgrounds/index', { title, camps });
    }
));


// #### add new campground
router.get('/new', (req, res) => {
    const title = `Add new Campground`;
    res.render('campgrounds/new', { title });
});

router.post('/', validateCampground, catchAsync(
    async(req, res, next) => {
        const { campground } = req.body; // name of inputs was like campground[title] and campground[location]
        const newCamp = new Campground(campground);
        await newCamp.save();
        req.flash('success', 'new Campground - added Successfully!');
        res.redirect(`/campgrounds/${newCamp.id}`);
    }
));

// #### campgrounds details page
router.get('/:id', catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const camp = await Campground.findById(id).populate('reviews');
        if (!camp) { throw new ExpressError('camp not found', 404); }
        const title = `${camp.title}`;
        res.render('campgrounds/show', { title, camp });
    }
));

// #### edit/update a campgrounds
router.get('/:id/edit', catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const camp = await Campground.findById(id);
        if (!camp) { throw new ExpressError('camp not Found', 404); }
        const title = `Edit - ${camp.title}`;
        res.render('campgrounds/edit', { title, camp });
    }
));

router.put('/:id', validateCampground, catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const campground = req.body.campground;
        const camp = await Campground.findByIdAndUpdate(id, {...campground }, { runValidators: true });
        req.flash('success', 'Update - Successful!');
        res.redirect(`/campgrounds/${camp.id}`);
    }
));

// #### delete campgrounds
router.delete('/:id', catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash('success', 'Campground delete - successful!');
        res.redirect('/campgrounds');
    }
));



module.exports = router;