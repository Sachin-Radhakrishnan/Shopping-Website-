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


var hashedPassword = passwordHash.generate('Sachin@123');


console.log(hashedPassword);
//console.log(passwordHash.verify('password123', hashedPassword)); // true
//console.log(passwordHash.verify(password, hashedPassword));
