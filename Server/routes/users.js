var express=require('express');
var app=express();
var router=express.Router();
var bodyParser = require('body-parser');
var crypto=require('crypto');
var path = require('path');
var db=require('./database');
var auth=require('./authenticate');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/displayusers', function(req, res, next) {

  var sql="select * from users where usertype!='superadmin' order by usertype";
  db.select(sql,function(result){
    if(result!='[]')
    {
    var result1 = JSON.parse(result);
    res.json(result1);
    res.end();
    }
    else
    {
      res.end("error");
    }
  });

});
//
router.get('/displayemployee', function(req, res, next) {

  var sql="select * from employee ";
  db.select(sql,function(result){
    if(result!='[]')
    {
    var result1 = JSON.parse(result);
    res.json(result1);
    res.end();
    }
    else
    {
      res.end("error");
    }
  });

});
//
router.post('/editemployee', function(req, res) {
var sql="update employee set fname='"+req.body.fname+"',lname='"+req.body.lname+"',salary='"+req.body.salary+"' where employee_id="+req.body.employee_id+"";
db.update(sql);
res.end();
});

router.post('/editstatus', function(req, res) {
console.log(req.body);
var sql="update users set status='"+req.body.status+"' where user_id="+req.body.user_id+"";
db.update(sql);
res.end();
});

module.exports = router;
