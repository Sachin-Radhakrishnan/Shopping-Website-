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

router.post('/addemployee', function(req, res) {
console.log(req.body);
var sql="select * from users where email='"+req.body.email+"'";
var response=res;
/*
console.log(hashedPassword);
console.log(passwordHash.verify('password123', hashedPassword)); // true
console.log(passwordHash.verify(password, hashedPassword));
   */
db.select(sql,function(result){

    if(result=='[]')
    {
            var password = generator.generate({
                length: 10,
                numbers: true
            });
            var username=req.body.fname+" "+req.body.lname;
            var hashedPassword = passwordHash.generate(password);
            emailExistence.check(req.body.email, function(err,res){
            if(res==true)
                      {
                         var transporter = nodemailer.createTransport({
                           service: 'gmail',
                           auth: {
                             user: 'sachin.kurup02@gmail.com',
                             pass: 'anitharaj@123'
                           }
                         });

                         var mailOptions = {
                             from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
                             to: req.body.email, //email
                             subject: 'Your login key',
                             html: '<p>Please use the following password to login:</p><p>'+password+'</p>'
                         };

                         transporter.sendMail(mailOptions, function(error, info){
                           if (error)
                           {
                             console.log(error);
                           }
                           else
                           {
                                 console.log('Email sent: ' + info.response);
                                 var sql="insert into users(username,email,password,usertype) values ('"+username+"','"+req.body.email+"','"+hashedPassword+"','executive')";
                                 db.insert(sql);
                                 var sql="select max(user_id) as id from users";
                                 db.select(sql,function(result){
                                 var result1 = JSON.parse(result);
                                 var sql3="insert into employee(fname,lname,gender,salary,hire_date,user_id) values('"+req.body.fname+"','"+req.body.lname+"','"+req.body.gender+"',"+req.body.salary+",'"+new Date().toDateString()+"',"+result1[0].id+") ";
                                 db.insert(sql3);
                                 response.json("success");

                                 });
                           }
                         });


                     }
             else
               {
                 //email checker fails
                response.json('The email you entered doesnot exists');
               }

               });
    }
    else
    {
    res.json("EmailID already in use with some other accounts...");
    }

});
/********************************************/
});
/*************************************************************************************************************************/
router.post('/orderedproducts', function(req, res ,next) {
auth.passport.authenticate('jwt', function(err, user, info) {
if(user!=false)
{
    var sql="select pdt.product_name,o.total,o.status,o.date_added,o.order_id from orders as o inner join ordered_products as p on o.order_id=p.order_id  inner join product as pdt on p.product_id=pdt.product_id  where o.user_id="+user[0].user_id+" order by o.date_added desc ";
    console.log(sql);
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
}
else
{
    res.json("invalid credentials");
}

})(req, res, next);
/*****************************************/
});

/**********************************************************************************************************************************/
router.post('/changepwd', function(req, res ,next) {
auth.passport.authenticate('jwt', function(err, user, info) {
if(user!=false)
{
    var sql="select * from users where user_id="+user[0].user_id+" ";
    console.log(sql);
    db.select(sql,function(result){
      console.log(result);
      if(result!='[]')
      {
        var result1=JSON.parse(result);
        if(passwordHash.verify(req.body.password, result1[0].password))
        {
          var password = generator.generate({
              length: 10,
              numbers: true
          });
          var hashedPassword = passwordHash.generate(req.body.password1);
          var sql="update users set password='"+hashedPassword+"' where user_id="+user[0].user_id+" ";
          db.update(sql);
          res.end("success");
        }
        else
        {
          res.json("error");
        }



      }
      else
      {
        res.end("error");
      }
    });
}
else
{
    res.json("invalid credentials");
}

})(req, res, next);
/*****************************************/
});
/***************************************************************************************************************/
router.post('/changeorderstatus', function(req, res, next) {

console.log(req.body);
var sql="update orders set status='shipped' where order_id="+req.body.order_id+"";
db.update(sql);

var sql2="SELECT email FROM users where user_id in (select user_id from orders where order_id="+req.body.order_id+")";
console.log(sql2);
db.select(sql2,function(result){
var result1 = JSON.parse(result);
var email=result1[0].email;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sachin.kurup02@gmail.com',
    pass: 'anitharaj@123'
  }
});

var mailOptions = {
    from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
    to:email, //email
    subject: 'Shipping Notification',
    html: '<p>The order #order '+req.body.order_id+' is shipped successfully..It will be dispatched within 2 or 3 days </p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error)
  {
    console.log(error);
  }
  else
  {
        console.log('Email sent: ' + info.response);

  }
});

//sql closing
});
res.end();

});
module.exports = router;
