
// IP address on the 14/02/2015 = 109.155.63.67
var myFunctions = require('./myFunctions');
var errors = require('./routes/errors')
var path = require('path');
var blog = require('./blog');
var express = require('express'),
    exphbs  = require('express-handlebars');
var am = require('./modules/account-manager.js');

//var bootstrap = require('bootstrap')
/*
//
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DialDoctorDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
    console.log('Database connection OK')
});
var accounts = db.collection('users');
*/
//
var err =  undefined;
var user = undefined;
function logFinishedLogin(err,user){
    console.log("login Complete");
    if(user){
        console.log(user);
    }
    else {
        console.log(err);
    }
}

am.manualLogin("SCollis1968@gmail.com","abc",logFinishedLogin);
//console.log(user);


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {
        showTitle: true,
        userName: myFunctions.getUserName(),
        // Override `foo` helper only for this rendering.
        helpers: {
            foo: function () { return 'foo.'; }
        }
    });
});

app.get('/blog',function(req,res){
    res.render('blog',{showTitle: true,userName: myFunctions.getUserName(),entries: blog.getBlogEntries() });
    console.log(myFunctions.getUserName())
});

app.get('/signin',function(req,res){
    res.render('signin',{showTitle: true,userName: myFunctions.getUserName(),entries: blog.getBlogEntries() });
    console.log(myFunctions.getUserName())
});

app.listen(3001);