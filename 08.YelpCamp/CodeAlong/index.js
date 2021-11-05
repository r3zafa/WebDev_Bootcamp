if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); //to use env
    // console.log(process.env.secret);
};

const express = require('express');
const path = require('path'); // including path
const mongoose = require('mongoose'); // db middleware
const ejsMate = require('ejs-mate'); //ejs-mate a partial template functions for the EJS template engine

const ExpressError = require('./utils/ExpressError'); //extended error msg
const methodOverride = require('method-override'); // solve http request problem and extend it to delete,patch,put request's
const session = require('express-session'); // to make session
const flash = require('connect-flash'); // to make flash msg's

const MongoDbStore = require('connect-mongo'); //MongoDB session store for Connect and Express
const morgan = require('morgan'); //morgan log's http requests
const fs = require('fs'); //to build log file
const Joi = require('joi'); // validation middleware

const passport = require('passport'); // authentication middleware
const LocalStrategy = require('passport-local'); // add local authentication solution
const mongoSanitize = require('express-mongo-sanitize'); // prevent mongoDB from injection attack with query
const helmet = require('helmet'); //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!

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
app.use(mongoSanitize()); // prevent from basic mongo injection attacks

app.engine('ejs', ejsMate); // partial template functions for the EJS
app.set('view engine', 'ejs'); // render engine
app.set('views', path.join(__dirname, 'views')); // template directory

// require roots ##################################################################

const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

// Database connection ###########################################################

const cloudDb = {
    url: process.env.DB_URL,
    name: 'Cloud DB'
};
const localDb = {
    url: 'mongodb://localhost:27017/yelpCamp',
    name: 'Local DB'
};

const db = cloudDb || localDb;

mongoose.connect(db.url)
    .then(() => {
        console.log(db.name, '- is UP!');
    })
    .catch(err => {
        console.log(db.name, 'no response from db. get sure you have started Mongodb in background');
    });

// ############ configuring session and flash ###################################
const secret = process.env.secret || 'thisShouldBeAbetterSecret!';
const store = new MongoDbStore({
    mongoUrl: db.url,
    secret,
    touchAfter: 24 * 60 * 60,
});

store.on('error', function(e) {
    console.log('session store error!', e);
});

const sessionConfig = {
    store,
    name: 'yelpSession',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7), // time for today + 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week max age of session
    }
};
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dqzdywts9/", //SHOULD MATCH CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// ############ passport configuration ###########################################
// ############ passport config should be after session configuration.

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Logging information and save them in log file ######################

const eventLoggerFile = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('tiny', { stream: eventLoggerFile }));

// defining middleware's ##############################################
// --------------------- put somethings here! -------------------------
// ############# flash massage middleware

app.use((req, res, next) => {

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user; // set a current user in session
    next();
})

// routes ############################################################

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

app.get('/', catchAsync(
    async(req, res) => {
        const dataCount = await Campground.countDocuments({});
        const title = '';
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