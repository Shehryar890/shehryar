 
     const dotenv = require('dotenv');
     dotenv.config();
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;


   passport.use(
    new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8345/outh/google/callback",
    },

    async(token , accesstoken,  profile , done)=>{

      if(profile){
        console.log(profile);

      done( null, profile)
      }
      else{
        console.log(err)
        res.status(500).json({message: "Failed to authenticate"})
      }




    }
  )
   )




