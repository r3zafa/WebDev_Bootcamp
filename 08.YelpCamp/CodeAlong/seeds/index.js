const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


// Database connection #################################################
const dbName = 'yelpCamp';

mongoose.connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
        console.log(dbName, '- Database is UP!');
    })
    .catch(err => {
        console.log(dbName, 'no response from db. get sure you have started Mongodb in background');
    });


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({}); // First delete everything
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
};

seedDB().then(
    () => mongoose.disconnect() //disconnect after usage
)