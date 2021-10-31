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
    for (let i = 0; i < 15; i++) {
        const price = Math.floor(Math.random() * 20 + 10);
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: "617ef4c575f279407ff6ddcf",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80",
            description: "error porro autem.Consectetur animi reprehenderit ex quae officia qui non debitis error porro autem.Consectetur animi reprehenderit ex quae officia qui non debitis",
            price
        })
        await camp.save();
    }
};

seedDB().then(
    () => mongoose.disconnect() //disconnect after usage
)