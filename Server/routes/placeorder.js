var express=require('express');
var app=express();
var router=express.Router();
var bodyParser = require('body-parser');
var crypto=require('crypto');
var path = require('path');
var db=require('./database');
var auth=require('./authenticate');

router.use(bodyParser.json());

router.post('/', function(req, res,next) {
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
                     var sql4="insert into shippingDetails(fname,lname,address,city,state,zip,user_id) values ('"+req.body.fname+"','"+req.body.lname+"','"+req.body.address+"','"+req.body.city+"','"+req.body.state+"',"+req.body.zip+","+user[0].user_id+")"
                     db.insert(sql4);
                     var d = new Date();
                     var curr_date = d.getDate();
                     var curr_month = d.getMonth() + 1; //Months are zero based
                     var curr_year = d.getFullYear();
                     var date=curr_month + "-" + curr_date +"-" + curr_year;
                     var sql="select max(shipping_id) as id from shippingDetails";
                     db.select(sql,function(result){
                     var result1 = JSON.parse(result);
                     var sql4="insert into orders(user_id,shipping_id,total,date_added,status) values ("+user[0].user_id+","+result1[0].id+","+req.body.grandtotal+",'"+date+"','pending')";
                     db.insert(sql4);
                     var sql5="select max(order_id) as id from orders";
                     db.select(sql5,function(result){
                     var result1 = JSON.parse(result);
                     for(var i=0;i<req.body.pdt_ids.length;i++)
                       {
                         var sql6="insert into ordered_products (order_id,product_id) values ("+result1[0].id+","+req.body.pdt_ids[i].product_id+")" ;
                         console.log(sql6);
                         db.insert(sql6);
                       }
                       res.json("success");
                     });
                   });



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
//////////////////////////////////////////////////
module.exports = router;
