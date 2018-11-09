var http = require('http');
var path = require('path');
var express = require('express');
var indexpage =  require('./routes/index');
var app =  express();
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');


// view engine setup
// app.set('view' , __dirname + '/views/');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine' , '.hbs')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/', indexpage); //ROUTING
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(8000, function(){
 console.log("server start at port 8000");
});

module.exports =  app;