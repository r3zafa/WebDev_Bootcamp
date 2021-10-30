const checkIsLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be signed in!');
        return res.redirect('/login');
    }
    return next();
};

module.exports = checkIsLoggedIn;