// ########################### require dependencies ####################
const express = require('express');
const router = express.Router({ mergeParams: true });
const multer = require('multer'); // middleware for handling multipart/form-data
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// ########################## middleware's #############################
const catchAsync = require('../utils/catchAsync');
const checkIsLoggedIn = require('../utils/checkIsLoggedIn');
const isAuthor = require('../utils/isAuthor');
const validateCampground = require('../utils/validateCampground');

// ######################### controllers ###############################
const campgroundsController = require('../controllers/campgrounds');

// ########################## routes ###################################

router.route('/')
    .get(catchAsync(campgroundsController.index)) // #### campgrounds index
    .post(checkIsLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundsController.createCampground)); // #### Create new Campground


// #### Render form for add new campground
router.get('/new', checkIsLoggedIn, campgroundsController.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundsController.renderCampgroundsDetailPage)) // #### campgrounds details page
    .put(checkIsLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundsController.updateCampground)) // #### Update Campground's
    .delete(checkIsLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCampground)); // #### delete campgrounds

// #### Render edit/update form for Campground
router.get('/:id/edit', checkIsLoggedIn, isAuthor, catchAsync(campgroundsController.renderCampEditForm));


// #### export router
module.exports = router;