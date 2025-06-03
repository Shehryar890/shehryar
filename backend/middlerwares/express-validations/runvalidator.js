const {validationResult} = require("express-validator");




const runvalidationMiddelware =(req,res,next)=>{

           const errors = validationResult(req);
           if(!errors.isEmpty()){
return res.status(400).json({
    success:false,
    errors:errors.array()
})
           }
           else{
            next()
           }

}



module.exports = runvalidationMiddelware;


