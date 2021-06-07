//Dependencies

const express = require ('express');
const mongoose = require ('mongoose');

//Require Model 

const Product = require ('./models/products.js');

//Initialize the Express App

const app = express ();

//Port Value

const PORT = 3000;

//Mount our middleware functions

app.use(express.urlencoded({extended:false}));

//Configure Mongoose 

const DATABASE_URL = 'mongodb+srv://admin:abc1234@products.jnypw.mongodb.net/mongoosestore?retryWrites=true&w=majority';

const db = mongoose.connection;

//GET INFOR FOR MONGOOSE CONNECT

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

//listen for mongodb events
db.on('error', (error)=>
    console.log(error.message + ' is mongodb not running?'));
db.on('connected', ()=> console.log('mongodb connected'));
db.on('disconnected', ()=> console.log('mongodb disconnected'));

//Set routes and controller code 
//INDUCES

// Index (Read Route)

app.get('/products', (req, res) => {
    Product.find({}, (error, foundProducts) => {
        res.send(foundProducts);
    });
});

app.post('/products', (req, res) => {
	Product.create(req.body, (error, createdProduct) => {
		res.send(createdProduct);
	});
});

//Tell Express To Listen
app.listen(PORT, () => console.log(`express is listening on port ${PORT}`));