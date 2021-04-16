const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const app = express();
const router = express.Router();

moongose.connect('mongodb://localhost:27017/node-crud-api', {
    useUnifiedTopology: true, useNewUrlParser: true 
});

const Product = require('./models/product');
//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/products', productRoute);
app.use('/products', productRoute);

module.exports = app;