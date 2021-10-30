// ######### require dependencies ##################

const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user');
const passport = require('passport');



router.get('/register', (req, res) => {
    const title = 'Register';
    res.render('users/register', { title });
})



router.post('/register', catchAsync(async(req, res) => {
    try {
        const { username, email, password } = req.body.register;
        // res.send(register); // for test propose
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser); // for test propose
        req.flash('success', 'your account is created successfully!');
        res.redirect('/login')
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }

}));


router.get('/login', (req, res) => {
    const title = 'Login';
    res.render('users/login', { title });
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    (req, res) => {
        const { username } = req.body;
        req.flash('success', `welcome back ${username}`);
        res.redirect('/campgrounds');
    }
)

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'successfully logged out!, see you later ...');
    res.redirect('/');
})




module.exports = router;