const express = require('express');
require('dotenv').config()

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const users = require('./routes/users');

const mongoose = require('mongoose')
const server = require('express-graphql')
const session = require('express-session');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config')
const cors = require('cors')

const User = require('./models/users')

const { AllTypes, AllResolvers } = require('./schema/index')
const { makeExecutableSchema } = require('graphql-tools')
const GraphQlSchema = makeExecutableSchema({ typeDefs: AllTypes, resolvers: AllResolvers })

const app = express();


mongoose.connect(config.database, { useNewUrlParser: true }).then(() => {
  console.log(`mongoose connected. server up on ${config.dev}`)
})

mongoose.globalPromise = Promise

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.secret,
}))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(User.authenticate('local')));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', users);

app.use('/api',
(req,_,next) => {
  return next()
},
server((req, res) => {
  return {
    schema: GraphQlSchema,
    context: { req },
    graphiql: true
  }
}));
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
