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
    for (let i = 0; i < 400; i++) {
        const price = Math.floor(Math.random() * 20 + 10);
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: "617ef4c575f279407ff6ddcf",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "error porro autem.Consectetur animi reprehenderit ex quae officia qui non debitis error porro autem.Consectetur animi reprehenderit ex quae officia qui non debitis",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                    "url": "https://res.cloudinary.com/dqzdywts9/image/upload/v1635802184/yelpCamp/tf3mvl2ayanr5bpgk6fj.jpg",
                    "filename": "yelpCamp/tf3mvl2ayanr5bpgk6fj"
                },
                {
                    "url": "https://res.cloudinary.com/dqzdywts9/image/upload/v1635802184/yelpCamp/zf1l6we3jw6wg9opkxmh.jpg",
                    "filename": "yelpCamp/zf1l6we3jw6wg9opkxmh"
                }
            ]
        })
        await camp.save();
    }
};

seedDB().then(
    () => mongoose.disconnect() //disconnect after usage
)