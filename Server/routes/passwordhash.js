var express=require('express');
var app=express();
var router=express.Router();
var bodyParser = require('body-parser');
var crypto=require('crypto');
var path = require('path');
var db=require('./database');
var auth=require('./authenticate');
var nodemailer = require('nodemailer');
var emailExistence = require('email-existence');
var passwordHash = require('password-hash');
var generator = require('generate-password');
router.use(bodyParser.json());
/* GET users listing. */

//


//var hashedPassword = passwordHash.generate('Sachin@123');


//console.log(hashedPassword);

var hashedPassword = passwordHash.generate('123');


console.log(hashedPassword);
console.log(passwordHash.verify('password123', 'sha1$003eb0dc$1$71a51150ced8c1e01b63a5be4d5a8f10e8eba3fb')); // true
console.log(passwordHash.verify('Sachin@123', 'sha1$003eb0dc$1$71a51150ced8c1e01b63a5be4d5a8f10e8eba3fb'));
