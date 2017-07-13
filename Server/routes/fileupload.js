var express=require('express');
var app=express();
var router=express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                       storage: storage
                   }).single('file');

router.use(bodyParser.json());
/* GET home page. */
router.post('/', function(req, res) {

  upload(req,res,function(err){
           if(err){
                res.json({error_code:1,err_desc:err});
                return;
           }
            //res.json({error_code:0,err_desc:null});
            console.log(req.file.path);
       });
});

module.exports = router;
