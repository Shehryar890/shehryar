
       

const jwt = require("jsonwebtoken")
        const logout = (req , res)=>{

                  const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

                  
                  if(token){

                   res.clearCookie("token");

                   return res.json({
                    message:"you have been logout"

                   })
                 
                   }
                   else{
                    return res.json({
                        success:false,
                        message:"already loggedout or loggedin"
                        
                    })


                  }
             

                 








        }

        module.exports ={
            logout
            
        }