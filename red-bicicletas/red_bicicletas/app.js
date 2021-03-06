var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session')

var indexRouter = require('./routes/index');
var tokenRouter = require('./routes/token')
var usersRouter = require('./routes/users');
var bikesRouter = require('./routes/bikes');
var bikesAPIRouter = require('./routes/api/bikes');
var usersAPIRouter = require('./routes/api/users');

const store = new session.MemoryStore;

var app = express();
app.use(session({
  cookie: {maxAge: 240 * 60 * 60 * 1000},
  store: store, 
  saveUninitialized: true,
  resave: 'true',
  secret: 'red_bicicletas_5151251154'
}))

var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/red_bicicletas';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/token', tokenRouter);

app.use('/bikes', bikesRouter);
app.use('/api/bikes', bikesAPIRouter);
app.use('/api/users', usersAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
