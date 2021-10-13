// ##################{ CONNECTING }####################

const mongoose = require('mongoose');
const dbName = 'myMovies';
mongoose.connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
        console.log('connected to db:', dbName);
    })
    .catch(err => {
        console.log(dbName, 'refused connection, more info ...');
        console.log(err);
    });

// ##################{ CREATING SCHEMA and MODEL }####################

// first things after connecting to mongoDB is to define a schema in mongoose
const moviesSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});
// secondly we use that schema to build models
// mongoose.model(['name of model - as string - should be singular and uppercase in first latter'], [name of schema]); 
const Movie = mongoose.model('Movie', moviesSchema); //mongoose take this and build a collection for us


// ##################{ WRITE DATA'S IN DB }####################

// 3. using model in "2" we can add information in collection
// new Movie(title: 'Batman',year:2011,score:9,rating:T)

// const batman = new Movie({ title: 'Batman', year: 2011, score: 9, rating: 'T' });
// batman.save();

//4. insertMany() Option in mongoose -  not used often
// const multipleBatman = Movie.insertMany([
//         { title: 'Batman2', year: 2012, score: 7, rating: 'T' },
//         { title: 'Batman3', year: 2013, score: 8, rating: 'R' },
//         { title: 'Batman4', year: 2014, score: 9, rating: 'Y' },
//         { title: 'Batman5', year: 2015, score: 3, rating: 'S' },
//         { title: 'Batman6', year: 2016, score: 7, rating: 'O' }
//     ])
//     .then(data => {
//         console.log('saved multiple data', data)
//     })
//     .catch(err => {
//         console.log('oh no error', err)
//     });

// ##################{ READ/FIND DATA'S FROM DB }####################
// finding information with mongoose: find() return  all information without parameter
// Movie.find()
//     .then(data => console.log(data))
//     .catch(err => console.log('oh no error', err));

// Movie.find({ rating: 'R', score: 8, year: 2013 })
//     .then(data => console.log(data))
//     .catch(err => console.log('oh no error', err));

// Movie.find({ year: { $gte: 2015 } })
//     .then(data => console.log(data))
//     .catch(err => console.log('oh no error', err));

// ########## gives back just the first movies founded
// Movie.findOne({ rating: 'R', score: 8, year: 2013 })
//     .then(data => console.log(data))
//     .catch(err => console.log('oh no error', err));

//######### .findById(id) is = to findOne({_id: id})
// Movie.findById('6166e6784cac7f88ccefecf8')
//     .then(data => console.log(data))
//     .catch(err => console.log('oh no error', err));

// ##################{ UPDATING DATA IN DB WITH mongoose }####################
// ######## updateOne(),updateMany()
// ######## findOneAndUpdate(), findByIdAndUpdate()
// ######## findOneAndReplace()

// Movie.updateOne({ title: 'Batman3' }, { year: 2020 })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

// Movie.findOne({ title: 'Batman3', year: 2020 })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

// Movie.updateMany({ title: { $in: ['Batman', 'Batman2'] } }, { rating: '+12' })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

// Movie.find({ title: { $in: ['Batman', 'Batman2'] } })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));


// Movie.findOneAndUpdate({ title: 'Batman3' }, { title: 'BatmanThree' })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

// Movie.find({ title: 'BatmanThree' })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

//new is a option that give us the updated object instead of old on
// Movie.findOneAndUpdate({ title: 'Batman3' }, { score: 10 }, { new: true })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

// ##################{ DELETING DATA IN DB WITH mongoose }####################
// ####### .remove(), .deleteOne(), .deleteMany()
// ####### findOneAndRemove(), findByIdAndRemove()
// ####### findOneAndDelete(), findByIdAndDelete()

//.remove() delete all matching results from db
// Movie.remove({ title: 'BatmanThree' })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));


// Movie.deleteMany({ title: 'Batman6' })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

// Movie.findOneAndRemove({ title: 'Batman2' })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));

// Movie.findOneAndDelete({ title: 'Batman2' })
//     .then(m => console.log(m))
//     .catch(err => console.log(err));