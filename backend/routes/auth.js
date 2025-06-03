const express = require('express');
const router = express.Router();

const {Signup  ,Login} = require('../controller/auth');
const {validatesignup }= require( '../middlerwares/express-validations/bodyreqhandler')
 const runvalidationMiddelware = require( '../middlerwares/express-validations/runvalidator')

         
router.post('/signup' , validatesignup, runvalidationMiddelware  , Signup);
router.post("/login",Login)






module.exports = router;
