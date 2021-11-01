// ########################### require dependencies ##################
const express = require('express');
const router = express.Router();
const passport = require('passport');

// ########################## controller #############################
const userController = require('../controllers/users');

// ########################## middleware's ###########################
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

// ########################## routers ################################

router.route('/register')
    .get(userController.renderRegisterForm) // #### Render register form
    .post(catchAsync(userController.register)); // #### register new User

router.route('/login')
    .get(userController.renderLoginForm) // #### render login form
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        userController.login); // #### login

// #### logout
router.get('/logout', userController.logout);



// #### export router
module.exports = router;