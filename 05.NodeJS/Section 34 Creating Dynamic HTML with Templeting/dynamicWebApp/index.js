const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    // res.send('Hi')
    res.render('home')
})

app.get('/rand', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    res.render('randomNum', { rand: randomNumber });
})




app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})