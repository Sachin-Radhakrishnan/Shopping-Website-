var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var socket_io=require('socket.io');
//
var io = socket_io();
app.io= io;
//routes specification
var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var category = require('./routes/addcategory');
var products = require('./routes/products')(io);
//middle ware section
app.use(logger('dev'));
app.use(bodyParser.json());
//handling different requests

app.all(function(request, response, next) {
response.header("Access-Control-Allow-Origin", "http://localhost:9000");
response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.use('/', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login', login);
app.use('/category', category);
app.use('/products', products);
app.get('/dummy',function(req,res){res.end("hai");});




module.exports = app;
