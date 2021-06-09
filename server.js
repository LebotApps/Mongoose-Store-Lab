
// Dependencies 

const express = require('express');
const app = express ();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products.js');
const Seed = require('./models/productSeed.js');

//Middleware
//Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended:true}));

//Database Connection

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Seed
// app.get('/products/seed', (req, res) => {
// 	Product.deleteMany({}, (error, allProduct) => {});

// 	Product.create(productSeed, (error, data) => {
// 		res.redirect('/products');
// 	});
// });
app.get('/products/seed', (req, res) => {
    Product.create(
    [{
    name: 'Beans',
    description: 'A small pile of beans. Buy more beans for a big pile of beans.',
    img: 'https://imgur.com/LEHS8h3.png',
    price: 5,
    qty: 99
  }, {
    name: 'Bones',
    description: 'It\'s just a bag of bones.',
    img: 'https://imgur.com/dalOqwk.png',
    price: 25,
    qty: 0
  }, {
    name: 'Bins',
    description: 'A stack of colorful bins for your beans and bones.',
    img: 'https://imgur.com/ptWDPO1.png',
    price: 7000,
    qty: 1
},
],
(error, data) => {
    res.redirect('/books');
}
);
});

//INDUCES 

//Index

app.get('/products/', (req, res) => {
    Product.find({}, (error, allProduct) =>{
        res.render('index.ejs', {
            Product: allProduct,
        });

    });
});


//New
app.get('/products/new', (req, res)=>{
    res.render('new.ejs');
})
//Delete

//Update

//Create
app.post('/products', (req, res) => {
    if(req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }
    Product.create(req.body, (error, createdProduct)=>{
        res.redirect('/products');
    });
});
//Edit

//Show

app.get('/products/:id', (req, res) =>{
    Product.findById(req.params.id, (err, foundProduct) =>{
        res.render('show.ejs', {log: foundProduct});
    });
});


//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
