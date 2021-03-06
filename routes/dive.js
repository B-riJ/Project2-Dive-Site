const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
// const DiveModel        = require('../models/diveModel')
const User              = require('../models/userModel');
const express           = require('express');
//create route for model 
const router            = express.Router();
const ensureLogin       = require('connect-ensure-login')
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash         = require('connect-flash');
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;
const multer        =require('multer');
const cloudinary    =require('cloudinary');
const uploadCloud    =require('../config/cloudinary');
// --defining Dive with diveModel ---
const Dives = require('../models/diveModel.js');

router.get("/divesites/new", (req, res) => {
  res.render("divesitesNew");
});

//--Edit dive site data -------------
router.get("/divesites/edit/:id", (req, res)=>{
  Dives.findById(req.params.id)
  .then((result) => { 
// pass in variable to view ",divesite=key
console.log("blah: ", result.title)
    res.render("divesites-edit",{divesite:result} );
  }) 


})
//-- end edit dive site --------------

router.post('/divesites/delete/:id', (req, res, next) =>{

  Dives.findByIdAndRemove({_id:req.params.id})
  //changed from findByIdAndRemove
  //findOneAndDelete
  .then(divesites => {
    // console.log(dive);
    res.redirect('/divesites')
  })
  .catch(error => {
    console.log(error);
  })
})

// ----update edit dive site ----- 
router.post('/divesites/update/:id', function (req, res) {
  console.log("here")
  Dives.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    createdBy: req.user.username,
    wreck: req.body.wreck,
    description: req.body.description,
    depth: req.body.depth,
    charter: req.body.charter,
  })
  .then(divesites => {
    // console.log(car);
    res.redirect('/divesites')
  })
  .catch(theError => { console.log(theError) })
  
  })

//--------end update dive sites

//---------divesite page details
router.get("/divesites/:id", (req,res) => {
  Dives.findById(req.params.id)
  .then((result) => { 
// pass in variable to view "divesites-detail, divesite=key
    res.render("divesites-detail",{divesite:result} );
  }) 


})
//------------end dive page details

// -----------view DB sites-------

router.get('/divesites', function (req, res) {
  Dives.find()
  .then(divesites => {
    let data = {};
    data.theList = divesites;
    res.render('divesites', data)
  })
  .catch(theError => { console.log(theError) })
})

// .then(divesites) match divesites=data.theList


//---POST dive site form
// create dive form name =photo
router.post("/divesites/create", uploadCloud.single('photo'),(req, res, next) => {
  console.log(req.user)
  const theSpot = req.body.site;
  const theLocationLong = req.body.longitude;
  const theLocationLat = req.body.latitude;
  // const theUser   = req.user.username;
  const theWreck = req.body.wreck;
  const theDescription = req.body.description;
  const theDepth = req.body.depth;
  const theCharter = req.body.charter;

//---end Post dive form for user----


//---dive site data to DB----
//--Dive not defined err---

const newDive = new Dives({
  title : theSpot,
  longitude : theLocationLong,
  latitude : theLocationLat,
  creator: req.user.username,
  wreck : theWreck,
  description : theDescription,
  depth: theDepth,
  charter : theCharter,

  // match key value with Schema key name in dive model(!)
})
// cloudshare file upload- if() photo is loaded, value url added to key:imgPath
if(req.file){
newDive.imgPath = req.file.url
}
//---end dive site DB 
newDive.save() 
.then((dive) => {
  //console.log(dive);
  res.redirect('/')
})
.catch(theError => { console.log(theError)})
})


//------Edit dive site route---



module.exports = router;
//export routes- i.e any get/post