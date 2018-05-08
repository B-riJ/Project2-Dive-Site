const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const diveSchema = new Schema ({
  title: {type: String},
  longitude: {type:String},
  latitude: {type: String},
  wreck: {type: String},
  description: {type: String},
  depth: {type: Number},
  charter: {type: String}


  
});

 const Dives = mongoose.model('Dives', diveSchema)
 // data model- manages the data, logic and rules of app.
 // Create object generated from data of a specific collection from adatabse

 module.exports = Dives;