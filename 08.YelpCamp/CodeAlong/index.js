const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const session = require('express-session'); // to make session
const flash = require('connect-flash'); // to make flash messages
const morgan = require('morgan'); //morgan log's http requests
const fs = require('fs'); //to build log file
const Joi = require('joi');

// ####################################################################
const catchAsync = require('./utils/catchAsync');
const Campground = require('./models/campground');
// ############ Start App #############################################
const app = express();
app.use(methodOverride('_method')); //patch,delete,...
app.use(express.json()); //parsing json
app.use(express.urlencoded({ extended: true })); //parsing url
app.use(express.static(path.join(__dirname, 'public'))); // css,js,... directory

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

//ejs-mate a partial template functions for the EJS template engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); // render engine
app.set('views', path.join(__dirname, 'views')); // template directory

// require roots #######################################################
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

// Database connection #################################################

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

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

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