// Requiring our dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //schema class

// Setup Schema 

const productSchema = new Schema (
    {
    
    //adding fields
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number,
    },
{ timestamps: true});

//Complie Schema into a model 
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
