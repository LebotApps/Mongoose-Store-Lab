// require and set up denpendcies 

const express = require('express');
const productsRouter = express.Router();
const Product = require('../models/products.js');
const Seed = require('../models/productSeed.js');

//export functionality


// Seed

const productSeed = require('../models/productSeed.js');

productsRouter.get('/seed', (req, res) => {
	Product.deleteMany({}, (error, allProduct) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/products');
	});
});


//INDUCES 

//Index

productsRouter.get('/', (req, res) => {
    Product.find({}, (error, allProduct) =>{
        res.render('index.ejs', {
            Product: allProduct,
        });

    });
});


//New
productsRouter.get('/new', (req, res)=>{
    res.render('new.ejs');
})
// DELETE route 

productsRouter.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/products');
    });
});

//Update

productsRouter.put('/:id', (req, res) => {
res.send(req.body);
});

//Create
productsRouter.post('/products', (req, res) => {

    Product.create(req.body, (error, createdProduct)=>{
        res.redirect('/products');
    });
});

// Edit
productsRouter.get('/:id/edit', (req, res) => {
    
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render(
            'edit.ejs',
            {
                Product: foundProduct 
            }
        );
    });
});

//Show

productsRouter.get('/:id', (req, res) =>{
    Product.findById(req.params.id, (err, foundProduct) =>{
        res.render('show.ejs', {Product: foundProduct});
    });
});

// Export

module.exports = productsRouter;