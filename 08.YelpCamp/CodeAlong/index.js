const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')

const app = express();
app.use(methodOverride('_method')); //patch,delete,...
app.use(express.json()); //parsing json
app.use(express.urlencoded({extended: true})); //parsing url
app.use(express.static(path.join(__dirname, 'public'))); // css,js,... directory
app.set('view engine', 'ejs'); // render engine
app.set('views', path.join(__dirname, 'views')); // template directory

// Database conection #################################################
const dbName = 'yelpCamp';
const Campground = require('./models/campground');

mongoose.connect(`mongodb://localhost:27017/${dbName}`)
.then(() => {
    console.log(dbName, '- Database is UP!');
})
.catch(err => {
    console.log(dbName, 'no response from db. get sure you have started mongod and mongo in background');
});


// rooooooooooting ###################################################

app.get('/', (req, res) => {
    const title = 'home';
    res.render('index', { title: title });
});

app.get('/makeCampground', async (req, res) => {
    // const title = 'home';
    const camp = new Campground({title:'My Backyard', description: 'cheap camping place'});
    await camp.save();
    res.send(camp);
    // res.render('index', { title: title });
});





app.listen(3000,()=>{
    console.log('server is UP at localhost:3000')
})