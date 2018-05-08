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

//---POST dive site form

router.post("/divesites/create", (req, res, next) => {
  const theSpot = req.body.site;
  const theLocationLong = req.body.longitude;
  const theLocationLat = req.body.latitude;
  const theWreck = req.body.wreck;
  const theDescription = req.body.description;
  const theCharter = req.body.charter;

//---end Post dive form for user----


//---dive site data to DB----
//--Dive not defined err---
const newDive = new Dive({
  dive : theSpot,
  locationLat : theLocationLong,
  locationLat : theLocationLat,
  wreck : theWreck,
  description : theDescription,
  charter : theCharter
  
})

//---end dive site DB 
newDive.save() 
.then((dive) => {
  //console.log(dive);
})
.catch(theError => { console.log(theError)})
res.redirect('/')
})

module.exports = router;
//export routes- i.e any get/post