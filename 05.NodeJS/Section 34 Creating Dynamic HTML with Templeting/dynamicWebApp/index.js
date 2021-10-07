const express = require('express');
const path = require('path');
const app = express();
const fakeData = require('./fakeData.json')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));





app.get('/', (req, res) => {
    // res.send('Hi')
    res.render('home');
})

app.get('/rand', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    res.render('randomNum', { rand: randomNumber });
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = fakeData[subreddit];
    // res.render('subreddit', { subreddit: subreddit }); //old
    if (data) {
        res.render('subreddit', {...data }); //new
    } else {
        res.send('<h1>Error 404 - not found</h1>');

    }
})

app.get('/conditionals', (req, res) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    res.render('conditionals', { rand: rand });
})

app.get('/forLoop', (req, res) => {

    const arrayOfNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'cat', 'dogs', 12, 14, 13, 20, 30];
    res.render('forLoop', { arr: arrayOfNum });
})

app.get('*', (req, res) => {
    res.send('<h1>ERROR 404 - Not a Valid URL</h1>');
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})