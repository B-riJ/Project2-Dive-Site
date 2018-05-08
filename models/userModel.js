const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema ({
  username: {type: String},
  password: {type: String},
  email: {
    type: String,
    match: [/.+@.+/, "Include an @ in your email "]
  }



  
});

 const User = mongoose.model('User', userSchema)
 //'user' - how to call this model
 // data model- manages the data, logic and rules of app.
 // Create object generated from data of a specific collection from adatabse

 module.exports = User;