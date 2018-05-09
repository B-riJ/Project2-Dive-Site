const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const DivesModel        = require('../models/diveModel')
const express           = require('express');
//create route for model 
const router            = express.Router();
const ensureLogin       = require('connect-ensure-login')
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash         = require('connect-flash');
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;
// --defining Dive with diveModel ---
const Dive = require('../models/diveModel.js');

router.get("/divesites/new", (req, res) => {
  res.render("divesitesNew");
});

//--Edit dive site data -------------
router.get("/divesites/edit/:id", (req, res)=>{
  DivesModel.findById(req.params.id)
  .then((result) => { 
// pass in variable to view ",divesite=key
console.log("blah: ", result.title)
    res.render("divesites-edit",{divesite:result} );
  }) 


})
//-- end edit dive site --------------

router.post('/divesites/delete/:id', function(req, res){

  DivesModel.findOneAndDelete({_id:req.params.id})
  //changed from findByIdAndRemove
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
  DivesModel.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    wreck: req.body.wreck,
    description: req.body.description,
    depth: req.body.depth,
    charter: req.body.charter,
    createdBy: req.user.email
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
  DivesModel.findById(req.params.id)
  .then((result) => { 
// pass in variable to view "divesites-detail, divesite=key
    res.render("divesites-detail",{divesite:result} );
  }) 


})
//------------end dive page details

// -----------view DB sites-------

router.get('/divesites', function (req, res) {
  Dive.find()
  .then(divesites => {
    let data = {};
    data.theList = divesites;
    res.render('divesites', data)
  })
  .catch(theError => { console.log(theError) })
})

// .then(divesites) match divesites=data.theList


//---POST dive site form

router.post("/divesites/create", (req, res, next) => {
  const theSpot = req.body.site;
  const theLocationLong = req.body.longitude;
  const theLocationLat = req.body.latitude;
  const theWreck = req.body.wreck;
  const theDescription = req.body.description;
  const theDepth = req.body.depth;
  const theCharter = req.body.charter;

//---end Post dive form for user----


//---dive site data to DB----
//--Dive not defined err---

const newDive = new Dive({
  title : theSpot,
  longitude : theLocationLong,
  latitude : theLocationLat,
  wreck : theWreck,
  description : theDescription,
  depth: theDepth,
  charter : theCharter
  // match key value with Schema key name in dive model(!)
})

//---end dive site DB 
newDive.save() 
.then((dive) => {
  //console.log(dive);
})
.catch(theError => { console.log(theError)})
res.redirect('/')
})


//------Edit dive site route---



module.exports = router;
//export routes- i.e any get/post