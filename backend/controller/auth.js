
const dotenv = require('dotenv');

dotenv.config();
const User = require('../models/user');

const bcrypt = require("bcrypt")



const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const { accessSync } = require('fs');


                   


                        const generateToken = (user)=>{

                          try{
                          return jwt.sign({Id:user._id,
                            email:user.email,
                     role:user.role





                          } 
                          , process.env.JWT_SECRET
                            , {expiresIn:"40d"}
                          
                          )
                        }
                        catch(err){
                          console.error("JWT Error:", error);
    return null;

                        }
                        }
  

 









        


                  const Signup =async (req , res)=>{

                    const {userName, email , password   } = req.body;
                  
                    
                    let role = "user";

if(!userName || !email || !password){
  return res.status(400).json({message : "Please fill all fields"})
 
}

if(email == process.env.ADMIN_EMAIL &&  password == process.env.ADMIN_PASSWORD){
  role = 'admin';
       
}
else{
  role = 'user';
}



               
                               
               const fixEmail = email.replace(/\s+/g, "");
               const fixusername= userName.replace(/\s+/g, "");

          
              

               try{
          
                      const user = await  User.findOne({email:fixEmail})

                      if(user){
                        return res.status(400).json({message : "User already exists"});
                      }
                      else{
                      
                    
                           
                        const newUser = new User({

                          userName: fixusername,
                          email: fixEmail,
                          password,
                          role,
                   
                        
                          
                         
                        })

                        await newUser.save()
                        
                        const token = generateToken(newUser);
                    

                    
                    res.cookie("token", token , {
                      httpOnly: true,
                 
                      secure: process.env.NODE_ENV === "production", 
                      sameSite: "strict", 
      maxAge: 40 * 24 * 60 * 60 * 1000,  
                     

                    });
                    console.log(token)


           

                             const {password: _ , ...userData} = newUser._doc;
                        
                        res.status(201).json({message : "User created successfully" , newUser : userData})
                      
                    
                      }
                    }
                    catch (error) {
                      console.error("Signup Error:", error);
                      return res.status(500).json({ message: "Something went wrong. Please try again later." });
                    }
                    }


                    const Login =async (req, res)=>{



                              const {email,password }= req.body;

                              

                              try{
                             const fixemail = email.trim().toLowerCase()
const user= await User.findOne({email:fixemail})

                   
                      if(user){
                                         
                            
                        const checkpassword =       await   bcrypt.compare(password , user.password)

                    if(checkpassword){

                    
                        const token = generateToken(user)
                        res.cookie("token", token , {
                          httpOnly: true,
                     
                          secure: process.env.NODE_ENV === "production", // 🛡️ Only HTTPS in production
                          sameSite: "strict", // 🛡️ Prevent CSRF attacks
      maxAge: 40 * 24 * 60 * 60 * 1000, 
                    
                        

                     
    
                        });

                        try{
                        if(!user.hasLoggedIn){
                          console.log("doing chnges")

                          user.hasLoggedIn = true;

                          await user.save();
                         }
                        }catch(error){
                          console.log(error.message)
                        }
                        const { password: _, ...userData } = user._doc;
                       return    res.status(201).json({message : "Logged in Succesfully" , newUser : userData})
                      }
                      else{
                        return res.status(400).json({
                          message:"enter password is incorrect"
                        })
                      }

                      }
                      else{
                        return res.status(400).json({
                        message:"Email not exists please signup "
                        
                    
                        })
                      }

                              }
                              catch (error) {
                                console.error("Signup Error:", error);
                                return res.status(500).json({ message: "Something went wrong. Please try again later." });
                              }




                    }

const getuserdForAdmin = async(req,res)=>{
try{
          const users = await User.find({})
if(users.length ===0){
  return res.status(400).json({
    success:false,
    message:"there is no user to be shown"
  })
}
return res.status(200).json({
  success:true,
  message:"users fetched succesfully",
  users:users
})}
catch(error){
  console.log(error.message)

  return res.status(500).json({
    success:false,
    message:"Internal server Error"
  })
}
                  
   
}


const updateUserrole = async(req,res)=>{

  const validRoles =["admin" ,"user"]

  const {userId} =req.params
  const {role } = req.body;
  try{
  if(!validRoles.includes(role)){
    return res.status(404).json({
      success:false,
      message:"Invalid Role"
    })
  }

   const user = await User.findOne({_id:userId})
   if(!user){
    return res.status(400).json({
      success:false,
      message:"User didnt exist",

    })
   }
   if(user.role === role){
    return res.status(400).json({
      success:false,
      message:"user already have that role"
    })
   }

   user.role = role;
   await user.save()
   return res.status(200).json({
    success:true,
    message:"user role updated successfully",
  user:user
  })


  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


                      
                 

               



                  module.exports = {Signup,
                    Login
,
getuserdForAdmin,

updateUserrole
                    
                  }

