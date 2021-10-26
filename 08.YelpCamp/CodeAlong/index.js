const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan'); //morgan log's http requests
const fs = require('fs'); //to build log file
const ejsMate = require('ejs-mate');
// ####################################################################
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const { campgroundSchema } = require('./schemas')

// Start App ##########################################################
const app = express();
app.use(methodOverride('_method')); //patch,delete,...
app.use(express.json()); //parsing json
app.use(express.urlencoded({ extended: true })); //parsing url
app.use(express.static(path.join(__dirname, 'public'))); // css,js,... directory

//ejs-mate a partial template functions for the EJS template engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); // render engine
app.set('views', path.join(__dirname, 'views')); // template directory

// Database connection #################################################
const dbName = 'yelpCamp';
const Campground = require('./models/campground');
const { application } = require('express');
const Joi = require('joi');

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
// see v0.1 and v0.2 branch for code ##################################

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
// defining middleware's ##############################################

// rooting ############################################################

app.get('/', catchAsync(
    async(req, res, next) => {
        const dataCount = await Campground.countDocuments({});
        const title = 'home';
        res.render('index', { title, dataCount });
    }
));

// #### campgrounds main page
app.get('/campgrounds', catchAsync(
    async(req, res, next) => {
        const title = 'Campgrounds';
        const camps = await Campground.find({});
        res.render('campgrounds/index', { title, camps });
    }
));


// #### add new campground
app.get('/campgrounds/new', (req, res) => {
    const title = `Add new Campground`;
    res.render('campgrounds/new', { title });
});

app.post('/campgrounds', validateCampground, catchAsync(
    async(req, res, next) => {
        // if (!req.body.Campground) throw new ExpressError('Invalid Campground Data', 400);
        // console.log(result)
        const { campground } = req.body; // name of inputs was like campground[title] and campground[location]
        const newCamp = new Campground(campground);
        await newCamp.save();
        res.redirect(`/campgrounds/${newCamp.id}`);
    }
));

// #### campgrounds details page
app.get('/campgrounds/:id', catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const camp = await Campground.findById(id);
        if (!camp) { throw new ExpressError('camp not found', 404); }
        const title = `${camp.title}`;
        res.render('campgrounds/show', { title, camp });
    }
));

// #### edit/update a campgrounds
app.get('/campgrounds/:id/edit', catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const camp = await Campground.findById(id);
        if (!camp) { throw new ExpressError('camp not Found', 404); }
        const title = `Edit - ${camp.title}`;
        res.render('campgrounds/edit', { title, camp });
    }
));

app.put('/campgrounds/:id', validateCampground, catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const campground = req.body.campground;
        const camp = await Campground.findByIdAndUpdate(id, {...campground }, { runValidators: true });
        res.redirect(`/campgrounds/${camp.id}`);
    }
));

// #### delete campgrounds
app.delete('/campgrounds/:id', catchAsync(
    async(req, res, next) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        res.redirect('/campgrounds');
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