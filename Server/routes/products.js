var express=require('express');
var app=express();
var router=express.Router();
var bodyParser = require('body-parser');
var crypto=require('crypto');
var path = require('path');
var db=require('./database');
var auth=require('./authenticate');

router.use(bodyParser.json());

router.post('/', function(req, res) {

  var sql="select * from product where subcategory_id="+req.body.id+" and status='active' and quantity>0";
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
/******************************************************************************************/
router.post('/search', function(req, res) {

  var sql="select p.product_id,p.product_name,p.product_description,p.price,p.quantity from product as p inner join subcategory as s  on p.subcategory_id=s.subcategory_id inner join category as c on s.category_id=c.category_id where p.status='active' and s.status='active' and c.status='active' and ( MATCH(product_name) against ('"+req.body.search+"*' IN BOOLEAN MODE) or MATCH(product_description) against ('"+req.body.search+"*' IN BOOLEAN MODE) or MATCH(category_name) against('"+req.body.search+"*' IN BOOLEAN MODE) or MATCH(subcategory_name) against ('"+req.body.search+"*' IN BOOLEAN MODE) ) ";
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
/******************************************************************************************/
router.post('/addtocart', function(req, res,next) {
  auth.passport.authenticate('jwt', function(err, user, info) {
    if(user!=false)
    {
           var sql1="select quantity from product where product_id="+req.body.id+" ";
           db.select(sql1,function(result){
           var result1 = JSON.parse(result);
           var quantity=result1[0].quantity;
            if(quantity>0)
             {
                 var sql="select * from shoppingcart where user_id="+user[0].user_id+" and product_id="+req.body.id+" ";
                 db.select(sql,function(result){
                      if(result=='[]')
                      {
                        var sql2="insert into shoppingcart(user_id,product_id) values ("+user[0].user_id+","+req.body.id+")";
                        db.insert(sql2);
                        res.json("Item added to your cart");
                      }
                      else
                      {
                        res.json("Already added to cart");
                      }
                 }); //sql closing
             }

             else
             {
                 res.json("Sorry...Product run out off stock..");
             }

             });
    }
    else
    {
       res.json("error");
    }

  })(req, res, next);

});
/********************************************************************************************************************************/
router.get('/displaycart', function(req, res,next) {
  auth.passport.authenticate('jwt', function(err, user, info) {


    if(user!=false)
    {

           var sql="select * from shoppingcart where user_id="+user[0].user_id+" and quantity>0";
           var id=[];
           var obj1={};
           var products=[],count=0;
           db.select(sql,function(result){

              if(result!='[]')
              {
                  var result1 = JSON.parse(result);

                  for(var i=0;i<result1.length;i++)
                    id[i]=result1[i].product_id;

                   result1.forEach(function(object){
                     var sql1="select * from product where product_id="+id[count]+" ";
                     count++;
                     db.select(sql1,function(result){
                         var result2 = JSON.parse(result);
                         obj1={};
                         obj1.product_id=result2[0].product_id;
                         obj1.product_name=result2[0].product_name;
                         obj1.product_description=result2[0].product_description;
                         obj1.price=result2[0].price;
                         obj1.quantity=object.quantity;
                         obj1.status=object.status;
                         products.push(obj1);

                         if(result1.length==products.length)
                               {res.json(products);}
                      });
                   });
              }
              else
              {
                res.json("empty");
              }
           }); //sql closing
    }
    else
    {
       res.json("error");
    }

  })(req, res, next);

});


/********************************************************************************************************************************/
router.post('/altercart', function(req, res,next) {

  auth.passport.authenticate('jwt', function(err, user, info) {

    if(user!=false)
    {
          var action=req.body.action;
          var id=req.body.id;
          if(action=='remove')
          {
              var sql="update shoppingcart set quantity=quantity-1 where product_id="+id+" and user_id="+user[0].user_id+"";
              db.update(sql);
              if(req.body.quantity==1)
              {
                var sql3="delete from shoppingcart where product_id="+id+" and user_id="+user[0].user_id+" ";
                db.delete(sql3);

              }
              res.json("success");
          }
          else if(action=='add')
          {
              var sql1="select quantity from product where product_id="+req.body.id+" ";
              db.select(sql1,function(result){
              var result1 = JSON.parse(result);
              var quantity=result1[0].quantity;
               if(req.body.quantity<quantity)
                {
                  var sql2="update shoppingcart set quantity=quantity+1 where product_id="+id+" and user_id="+user[0].user_id+"";
                  db.update(sql2);
                  res.json("success");
                }
                else
                {
                  res.json('no-stock');
                }
               });
          }
          else //action delete
          {
             var sql2="delete from shoppingcart where product_id="+id+" and user_id="+user[0].user_id+" ";
             db.delete(sql2);
             res.json("success");
          }
    }
    else
    {
       res.json("error");
    }

  })(req, res, next);

});
/*********************************************************************************************************************************/
router.post('/placeorder', function(req, res,next) {
  auth.passport.authenticate('jwt', function(err, user, info) {
    if(user!=false)
    {

      console.log(req.body);
      var unavailable=[],dummy=[],obj1,obj2;
      var count=0;
      req.body.pdt_ids.forEach(function(object){
        var sql1="select * from product where product_id="+object.product_id+" ";
        count++;
        db.select(sql1,function(result){
            var result2 = JSON.parse(result);
            if(result2[0].quantity<object.quantity)
             {
                 obj1={};
                 obj1.status="unavailable";
                 obj1.product_id=result2[0].product_id;
                 obj1.product_name=result2[0].product_name;
                 obj1.quantity=result2[0].quantity;
                 unavailable.push(obj1);
             }
                 obj2={abc:"hai"};
                 dummy.push(obj2);

            if(req.body.pdt_ids.length==dummy.length)
                {
                  console.log(unavailable);
                  if(unavailable.length!=0)
                   {
                    res.json(unavailable);
                   }
                   else
                   {
                     var sql2="delete from shoppingcart where user_id="+user[0].user_id+" ";
                     for(var i=0;i<req.body.pdt_ids.length;i++)
                       {
                         var sql3="update product set quantity=quantity-"+parseInt(req.body.pdt_ids[i].quantity)+" where product_id=" +req.body.pdt_ids[i].product_id+"" ;
                         console.log(sql3);
                         db.update(sql3);
                       }
                     db.delete(sql2);
                     res.json("success");
                   }
                }
         });
      });

    }
    else
    {
       res.json("error");
    }

  })(req, res, next);

});

/*********************************************************************************************************************************/
router.get('/displayproducts', function(req, res) {

  var sql="select * from product where  status='active' order by product_id desc";
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
/**********************************************************************************************************************************/
router.get('/displaycategory', function(req, res) {

  var sql="select * from category where  status='active' order by category_id";
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
/**********************************************************************************************************************************/
router.post('/editproduct', function(req, res) {
var sql="update product set product_name='"+req.body.product_name+"',product_description='"+req.body.product_description+"',price="+req.body.price+",quantity="+req.body.quantity+" where product_id="+req.body.product_id+"";
db.update(sql);
res.end();
});
/**********************************************************************************************************************************/
router.post('/deleteproduct', function(req, res) {
console.log(req.body);
var status=req.body.status;
if(status=='single')
  {
      var sql="delete from product where product_id="+req.body.data+"";
      db.delete(sql);
      res.end();
  }
  else if(status=='bulk')
  {
      for(var i=0;i<req.body.data.length;i++)
      {
        var sql="delete from product where product_id="+req.body.data[i]+"";
        db.delete(sql);
      }
      res.end();
  }

});
/**********************************************************************************************************************************/
router.post('/addproduct', function(req, res) {
console.log(req.body);
//var sql="insert into product set ? "+req.body;
db.insert("insert into product set ? ",req.body);
res.end();
});







module.exports = router;
