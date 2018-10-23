var express = require('express');
var router = express.Router();
const passportGoogle = require('../auth/google');


router.get('/google', passportGoogle.authenticate(
  'google',
  {
    scope: ['profile']
  }
));


router.get('/google/callback', passportGoogle.authenticate(
  'google',
  {
    failureRedirect: '/'
  }),
  (req, res, next) =>{
    res.redirect('/chat');
  }
  );
  
module.exports = router;
