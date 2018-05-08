const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const DivesModel        = require('../models/diveModel')
const express           = require('express');
//create route for model 
const router            = express.Router();

// --defining Dive with diveModel ---
const Dive = require('../models/diveModel.js');

router.get("/divesites/new", (req, res) => {
  res.render("divesitesNew");
});


router.get("/divesites/edit/:id", (req, res)=>{
  DivesModel.findById(req.params.id)
  .then((result) => { 
// pass in variable to view ",divesite=key
    res.render("divesites-edit",{divesite:result} );
  }) 


})


router.get("/divesites/:id", (req,res) => {
  DivesModel.findById(req.params.id)
  .then((result) => { 
// pass in variable to view ",divesite=key
    res.render("divesites-detail",{divesite:result} );
  }) 


})


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