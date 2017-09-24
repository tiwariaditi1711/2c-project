
    var mongoose = require('mongoose');

var cab_driverSchema = mongoose.Schema({

    drivfName: String,
    drivlName: String,
    drivAddress: String,
    drivNumber: String,
    drivEmail: String,
    drivLicence: String,
    cabrcarType: String,
    cabrcarModel: String,
    cabrcarName: String,
    cabrcarNumber: String,
    drivPassword: String

});

module.exports = mongoose.model('Driver', cab_driverSchema, 'Driver');


