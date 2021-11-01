const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    const title = 'Register';
    res.render('users/register', { title });
};

module.exports.register = async(req, res, next) => {
    try {
        const { username, email, password } = req.body.register;
        // res.send(register); // for test propose
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser); // for test propose
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'your account is created successfully!');
            res.redirect('/login');
        });

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.renderLoginForm = (req, res) => {
    const title = 'Login';
    res.render('users/login', { title });
};

module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash('success', `welcome back ${username}`);
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo; // to delete return to for next use.
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', 'successfully logged out!, see you later ...');
    res.redirect('/');
}