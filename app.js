var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongo=require('mongoose');
const expressHBS=require('express-handlebars');
const expressSession=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');

 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cartsRouter = require('./routes/cart');

var app = express();

mongo.connect('mongodb://localhost/ShoppingCard',{ useNewUrlParser: true, useCreateIndex:true ,useUnifiedTopology: true },(error)=>{
  if(error)
  {
    console.log(error);
  }
  else
  {
    console.log('Database connected successfully... ');
  }
});


require('./config/passport');

// view engine setup
// engint to control page layout 
// second parameter to determine default layout 
app.engine('.hbs' , expressHBS({defaultLayout : 'layout',extname : '.hbs',helpers:{
  isEqualOne: function(value)
  {
    if(value==1)
    {
      return true;
    }
    else
    {
      return false
    }
  }
}}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret:'Shopping-Cart@<>1',
  saveUninitialized:false,
  resave:true,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart',cartsRouter);



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
