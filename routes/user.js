const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const passport      = require("passport");
const User          = require('../models/userModel.js');
const express       = require('express');
const flash         = require('connect-flash');

// authorize the user
const router        = express.Router();
//setup routes
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const ensureLogin   = require("connect-ensure-login");
//npm install --save connect-ensure-login

router.get("/signup", (req, res) => {
  res.render("passport/signup");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});



router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("passport/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username:username }, "username", (err, user) => {
    if (user !== null) {
      res.render("passport/signup", { message: "Sorry, The username already exists" });
      return;
    }


  // standard for saving the password, password generation 
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    //added : username,

    //key: value (i.e const username =req.body.username)
    username: username,
    password: hashPass
  });
// after const newUser, then .save username and password
    newUser.save((err) => {
      if (err) {
        res.render("passport/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});
//----end of sign up route------

router.get("/login", (req, res) => {
  res.render("passport/login", {"message": req.flash("error")});
});

// login route

router.post("/login", passport.authenticate("local", {
  //private page iteration #2

  // passport standard for logging for username- copy/paste this
  //upon success, user is sent to /private pg
  successRedirect: "/private",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", {user: req.user});
// ^ added {user: req.user} to pull user infro to /passport/private.hbs
//--------ask how user is retrieved

});


module.exports=router;