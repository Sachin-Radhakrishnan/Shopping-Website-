var express=require('express');
var app=express();
var router=express.Router();
var bodyParser = require('body-parser');
var crypto=require('crypto');
var path = require('path');
var db=require('./database');

router.use(bodyParser.json());

/**************************************************************************************/
router.get('/', function(req, res) {

  var sql="select count(*) as count from category where status='active'";
  var obj = {};
  var items=[];
  /**************************** Database part ************************************************/
  db.select(sql,function(result){

     if(result!='[]')
     {
         var sql1="select c.category_name ,c.category_id,s.subcategory_name ,s.subcategory_id  from `database`.category as c inner join `database`.subcategory as s on c.category_id=s.category_id where c.status='active' and s.status='active' order by s.subcategory_id,c.category_id ";
         db.select(sql1,function(result){
         var result1 = JSON.parse(result).slice(0);
         var obj={};
         var obj1={};
         var obj2={};
         var item=[];
         var Array=[];
         //extract first item category details
         obj.categoryname=result1[0].category_name;
         obj.category_id=result1[0].category_id;
         //extract first item sub category details and put it in item array
         obj1.subcategory=result1[0].subcategory_name;
         obj1.subcategory_id=result1[0].subcategory_id;
         item.push(obj1);
         ////////////////////////////////////////////////////////////
          for(var i=1;i<result1.length;i++)
           {
             if(result1[i].category_name==result1[i-1].category_name)
              {
                 obj1={};
                 obj1.subcategory=result1[i].subcategory_name;
                 obj1.subcategory_id=result1[i].subcategory_id;
                 item.push(obj1);
              }
              else
              {

                obj.item=item;
                Array.push(obj);
                obj={};
                obj.categoryname=result1[i].category_name;
                obj.category_id=result1[i].category_id;
                obj1={};
                item=[];
                obj1.subcategory=result1[i].subcategory_name;
                obj1.subcategory_id=result1[i].subcategory_id;
                item.push(obj1);

              }
           }
                 obj.item=item;
                 Array.push(obj);
                 res.json(Array);
                 res.end();
               ///////////////////////////////////////////////////////////
               });
           }
           else
           {
            //nothing in db
              res.end('error');
           }
        });

});
/************************************************* category management ********************************************************************************/
router.get('/displaycategory', function(req, res) {

  var sql="select * from category  order by category_id desc";
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

/****************************************************************************************/
router.post('/displayParticularsubcategory', function(req, res) {
  console.log(req.body);
  var sql="select * from subcategory where category_id="+req.body.category_id+" order by subcategory_id desc ";
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

/****************************************************************************************/
router.get('/displaysubcategory', function(req, res) {

  var sql="select * from subcategory  order by subcategory_id desc";
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

/****************************************************************************************/
router.post('/editcategory', function(req, res) {
var sql="update category set category_name='"+req.body.category_name+"' where category_id="+req.body.category_id+"";
db.update(sql);
res.end();
});
/****************************************************************************************/
router.post('/editsubcategory', function(req, res) {
console.log(req.body);
var sql="update subcategory set subcategory_name='"+req.body.subcategory_name+"' where subcategory_id="+req.body.subcategory_id+"";
db.update(sql);
res.end();
});
/****************************************************************************************/
router.post('/deletecategory', function(req, res) {
console.log(req.body);
var status=req.body.status;
if(status=='single')
  {
      var sql="delete from category where category_id="+req.body.data+"";
      db.delete(sql);
      res.end();
  }
  else if(status=='bulk')
  {
      for(var i=0;i<req.body.data.length;i++)
      {
        var sql="delete from category where category_id="+req.body.data[i]+"";
        db.delete(sql);
      }
      res.end();
  }

});
/******************************************************************************************************/
router.post('/deletesubcategory', function(req, res) {
console.log(req.body);
      var sql="delete from subcategory where subcategory_id="+req.body.id+"";
      db.delete(sql);
      res.end();

});
/******************************************************************************************************/
router.post('/addcategory', function(req, res) {
console.log(req.body);
//var sql="insert into category set ? "+req.body;
db.insert("insert into category set ? ",req.body);
res.end();
});
/*****************************************************************************************************/
router.post('/editstatus', function(req, res) {
console.log(req.body);
var sql="update category set status='"+req.body.status+"' where category_id="+req.body.category_id+"";
db.update(sql);
res.end();
});

/********************************************************************************************/
router.post('/editsubcategorystatus', function(req, res) {
console.log(req.body);
var sql="update subcategory set status='"+req.body.status+"' where subcategory_id="+req.body.subcategory_id+"";
db.update(sql);
res.end();
});

module.exports = router;
