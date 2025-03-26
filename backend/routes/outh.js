const express = require('express');
const passport = require('passport');
const {googleSignup} = require('../controller/outh');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email' ],

 prompt: 'select_account',
   session:false}));

router.get(
  '/google/callback',
  passport.authenticate('google', {  session:false}),
 googleSignup
);

         

module.exports = router;
