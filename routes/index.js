const express = require('express');
const router  = express.Router();

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
