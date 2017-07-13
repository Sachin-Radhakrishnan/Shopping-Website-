var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


app.io= require('socket.io')();

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
next();
});


app.io.on('connection', function(socket) {

  console.log("socket eneterd");
   //console.log(socket.id);
  socket.on("placedorder",function(){

      console.log("placed order entered...");
      app.io.emit("Placedordersuccessfully","Success");

  });

});

//routes specification
var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var category = require('./routes/addcategory');
var products = require('./routes/products');
var placeorder = require('./routes/placeorder');
var upload=require('./routes/fileupload');
//middle ware section
app.use(logger('dev'));
app.use(bodyParser.json());
//


app.use('/', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login', login);
app.use('/category', category);
app.use('/products', products);
app.use('/placeorder', placeorder);
app.use('/upload', upload);
app.get('/dummy',function(req,res){res.end("hai");});




module.exports = app;
