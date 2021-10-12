const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
// middleware to parse request body from url
app.use(express.urlencoded({ extended: true }));
// middleware to parse request body from json file
app.use(express.json());
//UUID identifier - to give posts unique id's
const { v4: uuid } = require('uuid');
// uuid(); // calling uuid to create an id ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override');
// to be able to use patch in html we need method-override
app.use(methodOverride('_method'));
//########################################################
//CRUD: Create,read,update,delete POST, GET, PATCH, DELETE
//########################################################
//RESTful implementation blueprint
//################################
// GET /comments - to list all comments
// POST /comments - to create a new comments
// GET /comments/:id - to get a particular comment(using ID)
// PATCH /comments/:id - to update a particular comment.
// DELETE /comments/:id - to DELETE a particular comment.
//########################################################
//fake db data to train here :D
let comments = [{
            id: uuid(),
            username: 'Todd',
            comment: 'lol that is so funny!'
        },
        {
            id: uuid(),
            username: 'Skyler',
            comment: 'I like to go birdwatching with my dog'
        },
        {
            id: uuid(),
            username: 'Sk8erBoi',
            comment: 'Plz delete your account, Todd'
        },
        {
            id: uuid(),
            username: 'onlysayswoof',
            comment: 'woof woof woof'
        }
    ]
    //###################################################################
app.get('/', (reg, res) => {
    const title = 'home';
    res.render('home', { title: title });
})

app.get('/comments', (req, res) => {
    const title = 'comments';
    res.render('comments/index', { title: title, comments: comments });
})

app.get('/comments/new',
    (req, res) => {
        const title = 'new comments';
        res.render('comments/new', { title: title });
    })


app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
    // res.send('it worked') // not a good method. redirect is better
})

app.get('/comments/:id', (req, res) => {
    const title = 'show comment';
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { title: title, c: comment });

})

app.get('/comments/:id/edit', (req, res) => {
    const title = 'Edit';
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { title: title, c: comment });

})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments');
})






app.get('/tacos', (req, res) => {
    const title = 'tacos order';
    const msg = 'GET /tacos Response'
        // res.render('tacosOrder', { title: title, msg: msg });
    res.send(msg);

})
app.post('/tacos', (req, res) => {
    const title = 'tacos order';
    const { meat, qty } = req.body;
    const msg = `OK! here is your post:  ${meat} tacos ---- quantity: ${qty}`
        // res.render('tacosOrder', { title: title, msg: msg });
    res.send(msg);
    console.log(req.body)

})

app.get('*', (reg, res) => {
    const title = 'Not Found - ERROR 404';
    res.render('notFound', { title: title });
})

app.listen(3000, () => {
    console.log('Server started on port 3000!')
})