const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan'); //morgan log's http requests
const fs = require('fs'); //to build log file
const ejsMate = require('ejs-mate');
// ####################################################################
const AppError = require('./AppError');
const warpAsync = require('./warpAsync');


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
//if we dont use next we can nut go to next middleware // next(); 
// app.use((req, res, next) => {
//     console.log("hi from first middleware - if you return next() instead of just calling next(). the code after returning do not get executed after other middleware.");
//     return next();
//     console.log('hi from first middleware - after next()');
// });
// app.use((req, res, next) => {
//     console.log('hi from second middleware');
//     return next(); // next must included always. if not we dont going to get any response from express 
// });


// add request time to req. it make request time in every root handler available
// its important to manage the priority. if root handler was defined before this middleware. we couldn't access request time

// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     req.requestTime = Date.now();
//     return next();
// });

// app.use('/campgrounds', (req, res, next) => {
//     console.log('you are still in /campground/...  path o(*￣︶￣*)o')
//     return next();
// });


// rooting ############################################################

app.get('/', warpAsync(
    async(req, res, next) => {
        const dataCount = await Campground.countDocuments({});
        const title = 'home';
        res.render('index', { title, dataCount });
    }
));

// #### campgrounds main page
app.get('/campgrounds', warpAsync(
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

app.post('/campgrounds', warpAsync(
    async(req, res, next) => {
        const { campground } = req.body; // name of inputs was like campground[title] and campground[location]
        const newCamp = new Campground(campground);
        await newCamp.save();
        res.redirect(`/campgrounds/${newCamp.id}`);
    }
));

// #### campgrounds details page
app.get('/campgrounds/:id', warpAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const camp = await Campground.findById(id);
        if (!camp) { throw new AppError('camp not found', 404); }
        const title = `${camp.title}`;
        res.render('campgrounds/show', { title, camp });
    }
));

// #### edit/update a campgrounds
app.get('/campgrounds/:id/edit', warpAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const camp = await Campground.findById(id);
        if (!camp) { throw new AppError('camp not Found', 404); }
        const title = `Edit - ${camp.title}`;
        res.render('campgrounds/edit', { title, camp });
    }
));

app.put('/campgrounds/:id', warpAsync(
    async(req, res, next) => {
        const { id } = req.params;
        const campground = req.body.campground;
        const camp = await Campground.findByIdAndUpdate(id, {...campground }, { runValidators: true });
        res.redirect(`/campgrounds/${camp.id}`);
    }
));

// #### delete campgrounds
app.delete('/campgrounds/:id', warpAsync(
    async(req, res, next) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        res.redirect('/campgrounds');
    }
));

// app.get('/error', (req, res) => {
//     chicken.fly()
//     throw new AppError('not found', 401);
// });

// app.get('/admin', (req, res) => {
//     throw new AppError('You are not an admin', 403);
// });


// not found 404 using app.use
app.use((req, res) => {
    res.status(404).send('404 not found')
});

//custom Error Handler - must be defined at end of script after roots
// app.use((err, req, res, next) => {
//     console.log('+++++++++++++++ERROR++++++++++++++++')
//     res.status(500).send('An error ----------------------- is accrued!!!', err)
//     console.log('++++++++++++++++++++++++++++++++++++')
//     next(err)
// });

function handelValidationErr(err) {
    console.dir(err);
    return new AppError(`validation Failed... ${err.message}`, 400)
}
app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handelValidationErr(err)
    next(err);
})
app.use((err, req, res, next) => {
    const { status = 500, message = 'something went wrong' } = err;
    res.status(status).send(message);
    // next(err);
});


app.listen(3000, () => {
    console.log('server is UP at localhost:3000')
})