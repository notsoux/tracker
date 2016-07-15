const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const track_routes = require('./routes/track');

const dao = require( './dao/dao');
const constant = require('./constant/Constant');

dao.connect( function(){

});

const expressValidator = require('express-validator');
const util = require('util');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

app.use('/', routes);
app.use('/track', track_routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    let renderMessage = err.message;
    let errorMessage = {};
    switch( err.code){
      case constant.OBJECTID_NOT_VALID_FORMAT:
      case constant.VALIDATION_ERROR:{
        //renderMessage = 'Validation error';
        //errorMessage = util.inspect( err);
        res.status(err.status || 500);
        res.send( JSON.stringify( err));
        return;
        break;
      }
      default:{
        errorMessage = err;
      }

    }
    res.status(err.status || 500);
    res.render('error', {
      message: renderMessage,
      error: errorMessage
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
