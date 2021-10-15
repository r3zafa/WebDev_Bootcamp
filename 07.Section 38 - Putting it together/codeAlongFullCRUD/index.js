//###### {REQUIRING DEPENDENCIES} ######
const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid'); //UUID identifier, use: uuid();
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//###### {STARTING / CONFIGING EXPRESS} ############
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));// parse request body from url
app.use(express.json());// parse request body from json file
app.use(methodOverride('_method'));// to use PATCH method in html


//###### {DB's} ####################
const Product = require('./models/product');
//###### {STARTING DBs} ############
const dbName = 'farmStand';
mongoose.connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
        console.log(dbName, 'Database is UP!');
    })
    .catch(err => {
        console.log(dbName, 'no response, more details:');
        console.log(err);
    });

//###### {ROOTING} ##################
app.get('/', (reg, res) => {
    const title = 'home';
    res.render('index', { title: title });
})

app.get('/products', async (reg, res) => {
    const title = 'Products';
    const products = await Product.find({});
    res.render('products/index', { title: title, products: products });
})







//###### {ERROR 404} ##################
app.get('*', (reg, res) => {
    const title = 'Not Found - ERROR 404';
    res.render('notFound', { title: title });
})
//###### {LISTENING TO PORT} ##################
app.listen(3000, () => {
    console.log('Server started on port 3000!')
})
//###### {LISTENING TO PORT} ##################