const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/app')
const routes = require('./routes')

/* importing mysql */
const db = require('./database')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.options("*", cors())

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).json({
    success: false,
    message: 'Page not Not Found',
    error_code: 'NOT_FOUND'
  })
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err)

  return res.status(err.statusCode || 500).json({
    success: false,
    message: res.locals.message || 'Something went wrong',
    error_code: res.locals.error.errorCode || 'UNKNOWN_ERROR'
  })
});

const PORT = config.app.port || 4900
app.listen(PORT, function(err, result) {
  if (err) {
    console.log('error while starting the service')
  } else {
    console.log('server started successfully on ', PORT)
  }
})

module.exports = app;
