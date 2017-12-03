var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var responseTime = require('response-time');
var serveStatic = require('serve-static');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(responseTime())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Make jquery assets a static file
app.use('/javascripts', express.static(
  path.join(__dirname, 'node_modules/jquery/dist/')
));

// Make popper.js assets a static file
app.use('/javascripts', express.static(
  path.join(__dirname, 'node_modules/popper.js/dist/umd/')
));

// Make bootstrap4.beta2 assets a static file
app.use('/javascripts', express.static(
  path.join(__dirname, 'node_modules/bootstrap/dist/js/')
));
app.use('/stylesheets', express.static(
  path.join(__dirname, 'node_modules/bootstrap/dist/css/')
));

// Make font-awesome assets a static file
app.use('/fonts', express.static(
  path.join(__dirname, 'node_modules/font-awesome/fonts/')
));
app.use('/stylesheets', express.static(
  path.join(__dirname, 'node_modules/font-awesome/css/')
));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
