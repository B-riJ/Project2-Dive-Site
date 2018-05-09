const express = require('express');
const router  = express.Router();

const multer = require('multer');
var cloudinary = require('cloudinary')
const uploadCloud = require('../config/cloudinary.js');
//require model


//router.post ('upload', uploadCloud.sing('photo')-> 'photo' matches form )
// using creat: 
// Recipe.create ({
//images will be a field inside your model 
// path: req.file.url (is whats added to model)

//user.find
//.then((allUsers))
// insert template (key)

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
//changed home url

// // dive hompage route

// router.get('/divesites', (req, res, next) => {
//   res.render('/divesites');
//   // response.sendFile(__dirname + '/divesites');
// });


module.exports = router;
