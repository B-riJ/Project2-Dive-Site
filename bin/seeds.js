const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
mongoose.connect('mongodb://localhost/divesites');


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

 const dive = mongoose.model('Dive', diveSchema)