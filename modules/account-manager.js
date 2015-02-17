var mongoose = require('mongoose');

var dbPort 		= 27017;
var dbHost 		= 'mongodb://localhost';
var dbName 		= 'DialDoctorDB';

/* establish the database connection */

mongoose.connect(dbHost + '/' + dbName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Database connection OK :)')
});
var users = db.collection('user');


/* login validation methods */

exports.manualLogin = function(uName, pass, callback)
{
    users.findOne({"uName" : uName ,"password" : pass}, function(e, o) {
        if (o) {
            //console.log("User found OK");
            //console.log(o);
            callback(null,o);
        }
        else{
            console.log("Invalid User:" + uName + " or password:" + pass);
            callback('Invalid username or password');
        }
    }
    );
}
