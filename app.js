require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash         = require('connect-flash');
const User          = require('./models/userModel.js');
const Dive          = require('./models/diveModel.js');
const bcrypt        = require("bcrypt");


//brings user input to backend by storing in variable, allow access to POST body parameter

// added to enable bodyparser to function 

mongoose.Promise = Promise;
mongoose
.connect(process.env.MONGODB_URI, {useMongoClient: true})
// .connect('mongodb://localhost/divesites', {useMongoClient: true})
.then(() => {
  console.log('Connected to Mongo!')
}).catch(err => {
  console.error('Error connecting to mongo', err)
});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



// create /divesites route
// dive hompage route

// app.get('/Soflo', (req, res, next) => {
//   res.render('divesites');
//   // response.sendFile(__dirname + '/divesites');
// });



//authentication 
app.use(session({
  secret: "basic-auth-secret",
  cookie: {maxAge: 6000000},
  resave: true,
  saveUninitialized: true
}));
//added from lab-authentication-passport



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//passport feature
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
// more passport 
passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());

passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
  User.findOne({ username }, (err, user) => {

  if (err) {
    return next(err);
  }
  if (!user) {
    return next(null, false, { message: "Incorrect username" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return next(null, false, { message: "Incorrect password" });
  }

  return next(null, user);
});
}));

// default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';

app.use(passport.initialize());
app.use(passport.session());


const index = require('./routes/index');
// const passportRouter = require("./routes/passportRouter");
app.use('/', index);


const passportRouter = require("./routes/user");
app.use('/', passportRouter);
// app.use('/', passportRouter);

const diveSites = require("./routes/dive");
app.use('/', diveSites);
//---dive site create -----

//create a signout post route 
module.exports = app;
