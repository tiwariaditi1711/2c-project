var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST

var ChangePassword = require('../models/cab_driver-crud.js');

router.get('/getPass', function(req, res) {
  //  console.log("REACHED GET FUNCTION ON SERVER");
    Driver.find({}, function(err, docs) {
        res.json(docs);

    });
});

router.get('/getPass/:id', function(req, res) {
  //  console.log("REACHED GET ID FUNCTION ON SERVER");
    Driver.find({drivEmail: req.params.id}, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addPass', function(req, res) {
    //console.log(req.body);


    var driverfName = req.body.drivfName;
    var driverlname = req.body.drivlName;
    var email = req.body.drivEmail;
    var password = req.body.drivPassword;
    var newpassword = req.body.Password;

  

    var pswrd = new Driver({

       drivfname: driverfname,
      drivlname: driverlname ,
       drivEmail: email,
       drivPassword: password,
       Password: newpassword
        
    });

    pswrd.save(function(err, docs) {
        if (err) throw err;
        console.log("New Password Saved Successfully");
        res.json(docs);
    });

})
