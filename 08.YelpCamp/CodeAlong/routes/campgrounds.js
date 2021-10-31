// ########################### require dependencies ##################
const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');

// ########################## middleware's #############################
const catchAsync = require('../utils/catchAsync');
const checkIsLoggedIn = require('../utils/checkIsLoggedIn');
const isAuthor = require('../utils/isAuthor');
const validateCampground = require('../utils/validateCampground');

// ########################## roots ###################################
// #### campgrounds main page
router.get('/', checkIsLoggedIn, catchAsync(
    async(req, res, next) => {
        const title = 'Campgrounds';
        const camps = await Campground.find({});
        res.render('campgrounds/index', { title, camps });
    }
));


// #### add new campground
router.get('/new', checkIsLoggedIn, (req, res) => {
    const title = `Add new Campground`;
    res.render('campgrounds/new', { title });
});

router.post('/', checkIsLoggedIn, validateCampground, catchAsync(
    async(req, res) => {
        const { campground } = req.body; // name of inputs was like campground[title] and campground[location]
        campground.author = req.user._id; //adding the author in object
        const newCamp = new Campground(campground);
        await newCamp.save();
        req.flash('success', 'new Campground - added Successfully!');
        res.redirect(`/campgrounds/${newCamp.id}`);
    }
));

// #### campgrounds details page
router.get('/:id', checkIsLoggedIn, catchAsync(
    async(req, res) => {
        const { id } = req.params;
        const camp = await Campground.findById(id).populate('reviews').populate('author');
        if (!camp) {
            req.flash('error', 'Cannot find that campground');
            // throw new ExpressError('camp not found', 404);
            return res.redirect('/campgrounds');
        };
        const title = `${camp.title}`;
        res.render('campgrounds/show', { title, camp });

    }
));

// #### edit/update a campgrounds
router.get('/:id/edit', checkIsLoggedIn, isAuthor, catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const campground = await Campground.findById(id);

        if (!campground) {
            req.flash('error', 'Cannot load the edit page. somethings went wrong!!');
            // throw new ExpressError('camp not found', 404);
            return res.redirect(`/campgrounds`);
        };

        const title = `Edit - ${campground.title}`;
        res.render('campgrounds/edit', { title, camp: campground });
    }
));

router.put('/:id', checkIsLoggedIn, validateCampground, isAuthor, catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const updatedCampground = req.body.campground;
        const camp = await Campground.findByIdAndUpdate(id, {...updatedCampground }, { runValidators: true });
        req.flash('success', 'Update - Successful!');
        res.redirect(`/campgrounds/${camp.id}`);
    }
));

// #### delete campgrounds
router.delete('/:id', checkIsLoggedIn, isAuthor, catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash('success', 'Campground delete - successful!');
        res.redirect('/campgrounds');
    }
));



module.exports = router;