var myFunctions = require('./myFunctions');
var blog = require('./blog');
var express = require('express'),
    exphbs  = require('express-handlebars');


var app = express();

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

app.listen(3001);