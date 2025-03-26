
const dotenv = require('dotenv');

dotenv.config();
const User = require('../models/user');



const crypto = require('crypto');

const jwt = require('jsonwebtoken');


                   


                        const generateToken = (user)=>{
                          return jwt.sign({Id:user._id,
                            email:user.email,
                     




                          } 
                          , process.env.JWT_SECRET
                            , {expiresIn:"40d"}
                          
                          )
                        }
  

 









        


                  const Signup =async (req , res)=>{

                    const {userName, email , password   } = req.body;
                    console.log(req.body);
                    
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
                 
                      secure: process.env.NODE_ENV === "production", // 🛡️ Only HTTPS in production
                      sameSite: "strict", // 🛡️ Prevent CSRF attacks
                      maxAge: 7 * 24 * 60 * 60 * 1000,

                    });
                    console.log(token)


           

                        
                        res.status(201).json({message : "User created successfully" , newUser : newUser})
                      
                    
                      }
                    }
                    catch (error) {
                      console.error("Signup Error:", error);
                      return res.status(500).json({ message: "Something went wrong. Please try again later." });
                    }
                    }





                      
                 

               



                  module.exports = {Signup}

