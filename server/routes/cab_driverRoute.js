var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST

var Driver = require('../models/cab_driver-crud.js');
var User = require('../models/User.js');
//var multer = require('multer');
var jwt = require('jsonwebtoken');

router.get('/getDriv', function(req, res) {
  //  console.log("REACHED GET FUNCTION ON SERVER");
    Driver.find({}, function(err, docs) {
        res.json(docs);

    });
});

router.get('/getDriv/:id', function(req, res) {
  //  console.log("REACHED GET ID FUNCTION ON SERVER");
    Driver.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addDriv', function(req, res) {
  //  console.log(req.body);
    var driverfName = req.body.drivfName;
    var driverlname = req.body.drivlName;
    var address = req.body.drivAddress;
    var phone = req.body.drivNumber;
    var email = req.body.drivEmail;
    var licence = req.body.drivLicence;
    var carType = req.body.cabrcarType;
    var carModel = req.body.cabrcarModel;
    var carName = req.body.cabrcarName;
    var carNumber = req.body.cabrcarNumber;

     var driver = new Driver({

        drivfName: driverfName,
        drivlName: driverlname,
        drivAddress: address,
        drivNumber: phone ,
        drivEmail: email,
        drivLicence: licence,
        cabrcarType: carType,
        cabrcarModel: carModel,
        cabrcarName: carName,
        cabrcarNumber: carNumber
  });

    driver.save(function(err, docs) {
        if (err) throw err;
        console.log("Driver Saved Successfully");
        res.json(docs);
    });

//8888888888888888888888888888888888888888888888888888888888888
var newUser = new User();
newUser.FirstName = req.body.drivfName;
newUser.LastName = req.body.drivlName;
newUser.MobileNumber = req.body.drivNumber;
newUser.Email = req.body.drivEmail;
newUser.Password = newUser.generateHash("password");//newUser.generateHash("password");//(req.body.Password);
newUser.UserType = "Driver";
newUser.save(function(err) {
    if (err) {
        res.json(err);
    } else {
        res.json({
            success: true
        });
        console.log('Signup API Called');
        }
    });

//88888888888888888888888888888888888888888888888888888888888

})

router.delete('/deleteDriv/:id', function(req, res) {
    //console.log("REACHED Delete FUNCTION ON SERVER for driver");
      Driver.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
});




// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;
