const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const diveSchema = new Schema ({
  title: {type: String},
  location: { 
    longitude: String,
    latitude: String},
  wreck: {type: String},
  description: {type:String},
  depth: {type: Number},
  charter: {type: Number}


  
});

 const Dives = mongoose.model('Dive', diveSchema)
 // data model- manages the data, logic and rules of app.
 // Create object generated from data of a specific collection from adatabse

 module.exports = Dives;