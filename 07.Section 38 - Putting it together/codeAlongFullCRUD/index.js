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
app.use(express.urlencoded({ extended: true })); // parse request body from url
app.use(express.json()); // parse request body from json file
app.use(methodOverride('_method')); // to use PATCH method in html


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

//###### {DB's} ####################
const Product = require('./models/product');

//###### {ROOTING} ##################
app.get('/', (reg, res) => {
    const title = 'home';
    res.render('index', { title: title });
});

app.get('/products', async(req, res) => {
    const title = 'Products';
    const products = await Product.find({});
    res.render('products/index', { title: title, products: products });
});

app.post('/products', (req, res) => {
    const { price, tag, productName } = req.body;
    const newProduct = new Product({ name: productName, price: price, category: tag });
    newProduct.save()
        .then(data => {
            console.log('following data was saved to', dbName, 'as you see under:')
            console.log(data);
        })
        .catch(err => console.log('ERROR:', err));
    res.redirect('/products');
});

app.get('/products/new', (req, res) => {
    const title = 'add new Products';
    res.render('products/newProduct', { title: title });
});

app.get('/products/:id', async(req, res) => {
    const title = 'Product detail';
    const { id } = req.params;
    console.log(id);
    const oneProduct = await Product.findById(id);
    res.render('products/showProduct', { title: title, oneProduct: oneProduct });
});

app.post('/products/:id', async(req, res) => {
    const { comment, id } = req.body;
    const oneProduct = await Product.findById(id);
    oneProduct.update({ _id: id }, { "$push": { "comments": comment } })
        .then(data => {
            console.log('following data was saved to', dbName, 'as you see under:')
            console.log(data);
        })
        .catch(err => console.log('ERROR:', err));
    res.redirect('/products/id');
});

app.get('/products/:id/new/comment', async(req, res) => {
    const title = 'add new comment';
    const { id } = req.params;
    console.log(id);
    const oneProduct = await Product.findById(id);
    res.render('products/newComment', { title: title, oneProduct: oneProduct });

});
app.get('/products/:id/edit', async(req, res) => {
    const title = 'Edit Product';
    const { id } = req.params;
    console.log(id);
    const oneProduct = await Product.findById(id);
    res.render('products/editProduct', { title: title, oneProduct: oneProduct });

});

app.patch('/products/:id', async(req, res) => {
    const { id } = req.params;
    const newName = req.body.productName;
    const newPrice = req.body.priceUpdate;
    const newTag = req.body.tagUpdate;
    await Product.findOneAndUpdate({ id: 'id' }, { name: newName, price: newPrice, category: newTag })
        .then(m => console.log(m))
        .catch(err => console.log(err));
    res.redirect('/products');
});

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    await Product.findOneAndRemove({ id: 'id' })
        .then(e => console.log(e))
        .catch(err => console.log(err));

    res.redirect('/products');
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