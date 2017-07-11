module.exports=function(io)
{
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  io.on('connection', function(socket) {

    console.log("socket eneterd")
    console.log(socket.id);
    socket.emit("orderplaced","hello..server....");

  });

});

return  router;
}
