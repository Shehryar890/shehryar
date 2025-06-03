const express = require("express")

const router = express.Router();
const { csrfProtection }  = require( "../middlerwares/csrf/csrftoken");
const { sendcsrftoken }   = require( "../middlerwares/csrf/tokensndingtofrontend");
const {metadata} = require( "../middlerwares/csrf/fetchmetadata");


           router.get("/csrftoken"   , csrfProtection , sendcsrftoken)
module.exports = router;


//   "csrf": "slB98Mw8-8whsgssup2Wbq5uijqUsRhHyOlQ"