var express=require('express');
var router=express.Router();
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var db=require('./database');
var auth=require('./authenticate');
var passwordHash = require('password-hash');
var generator = require('generate-password');

router.use(bodyParser.json());

router.post('/',function(req,res){
 var result1=[];
console.log(req.body);
 var sql="select * from users where email="+db.connection.escape(req.body.username);
 db.select(sql,function(result){
  if (result!='[]')
  {
    result1=JSON.parse(result);
    console.log(result1);
    //var hashedPassword = passwordHash.generate('Sachin@123');
    console.log(req.body.password);
    console.log(result1[0].password);

    if(passwordHash.verify(req.body.password, result1[0].password))
    {
    var payload = {id: result1[0].user_id,username:result1[0].username,email:result1[0].email};
    var token = jwt.sign(payload, auth.option.secretOrKey);
    res.json({message: "ok", token: token,usertype:result1[0].usertype});
    }
    else
    {
      res.status(401).json({message:"Invalid Credentials"});
    }
  }
  else
  {
   res.status(401).json({message:"Invalid Credentials"});
  }

 });

});
///////////////////////////////////////////////

module.exports=router;
