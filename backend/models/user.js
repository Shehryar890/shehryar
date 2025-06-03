const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


        const userSchema = new mongoose.Schema({
          userName:{
            type: String,
            required: true

          },
          email:{
            type: String,
            required: true,
            unique: true,}
            ,
            password:{
            type: String,
           
            },
            role:{
              type: String,
              enum: ["admin", "user"],
              default: "user"
 
            },
           googleId: {
   type:String ,

          
            required: false,
        



        
     
    

    
    // Ensures uniqueness
 // Allows multiple users without googleId
  },

            image:{
              type: String,
              default: null,
            },

            hasLoggedIn:{
              type:Boolean,
              default:false,
            }
          ,
          lastActiveDate:{
            type: Date,
            default:Date.now
          }

            
     

        


            
            
        },{timestamps:true})
               
      userSchema.pre("save", async function ( next){

        if(!this.isModified("password")){
          return next();
        }
        try{
        
          const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(this.password, salt)
                    this.password = hashedPassword;
                     next();
        }
        catch(err){
          console.error(err);
          return next(err);
        }
      
      })

         const User = mongoose.model('User', userSchema);
         module.exports = User;