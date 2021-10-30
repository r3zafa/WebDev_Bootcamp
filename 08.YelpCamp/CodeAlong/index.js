const express = require('express');
const path = require('path'); // including path
const mongoose = require('mongoose'); // db middleware
const ejsMate = require('ejs-mate'); //ejs-mate a partial template functions for the EJS template engine
const ExpressError = require('./utils/ExpressError'); //extended error msg
const methodOverride = require('method-override'); // solve http request problem and extend it to delete,patch,put request's
const session = require('express-session'); // to make session
const flash = require('connect-flash'); // to make flash msg's
const morgan = require('morgan'); //morgan log's http requests
const fs = require('fs'); //to build log file
const Joi = require('joi'); // validation middleware
const passport = require('passport'); // authentication middleware
const LocalStrategy = require('passport-local'); // add local authentication solution

// ############# requiring modules and functions ###############################

const catchAsync = require('./utils/catchAsync');
const Campground = require('./models/campground'); // mongoose campground module 
const User = require('./models/user'); // mongoose user module 

// ############ Start App / config app #########################################

const app = express(); // Start express app
app.use(methodOverride('_method')); //patch,delete,... using queries
app.use(express.json()); //parsing json
app.use(express.urlencoded({ extended: true })); //parsing url
app.use(express.static(path.join(__dirname, 'public'))); // css,js,... directory
app.engine('ejs', ejsMate); // partial template functions for the EJS
app.set('view engine', 'ejs'); // render engine
app.set('views', path.join(__dirname, 'views')); // template directory

// ############ configuring session and flash ###################################

const sessionConfig = {
    secret: 'thisShouldBeAbetterSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7), // time for today + 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week max age of session
    }
};
app.use(session(sessionConfig));
app.use(flash());

// ############ passport configuration ###########################################
// ############ passport config should be after session configuration.

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// require roots ##################################################################

const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

// Database connection ###########################################################

const dbName = 'yelpCamp';
mongoose.connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
        console.log(dbName, '- Database is UP!');
    })
    .catch(err => {
        console.log(dbName, 'no response from db. get sure you have started Mongodb in background');
    });

// Logging information and save them in log file ######################

const eventLoggerFile = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('tiny', { stream: eventLoggerFile }));

// defining middleware's ##############################################

// --------------------- put somethings here! -------------------------

// ############# flash massage middleware #############################

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// rooting ############################################################

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

app.get('/', catchAsync(
    async(req, res, next) => {
        const dataCount = await Campground.countDocuments({});
        const title = 'home';
        res.render('index', { title, dataCount });
    }
));


//new 404 code:
app.all('*', (req, res, next) => {
    next(new ExpressError('404 - Page not found', 404));
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Oh no, Something went wrong!'
    const title = `Error ${status}`;
    res.status(status).render('error', { title, err })
});


app.listen(3000, () => {
    console.log('server is UP at localhost:3000')
})