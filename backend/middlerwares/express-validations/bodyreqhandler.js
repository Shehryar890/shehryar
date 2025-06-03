const{ body , query} = require("express-validator");



     const validatesignup = [

                 body("userName").trim().escape().isString().withMessage("userNamee must be string").notEmpty().withMessage("userName is required"),


                 body("email").trim().escape().normalizeEmail().notEmpty().withMessage("email shouldnt be empty"),

                body("password").escape().isLength({min:8, max:100}).notEmpty().withMessage("password  must not be empty"),

                                   




     ]


              const validateCreateProduct =[
                         
               body("name").trim().escape().isString().notEmpty().withMessage("Product Name should'nt be empty"),
               body("description").trim().isString().escape(),
                    
               body("price").isFloat().custom((value , {req})=>{
                  if(value<0){
                                         throw new Error("price must not be less than zero ")
                  }
                  else{
                     return true
                  }
               }).escape(),

               body("category").customSanitizer((value , {req})=>{

                         if(typeof value === "String"){
                        return   value = [value];
                         }
                         else{
                       return    value;
                         }

               }
            
            
            
            ).isArray().withMessage("category must be an array").escape(),

            body("brand").optional().trim().escape().isString().withMessage("Brand name must be String"),

           

body("stock").trim().isInt().withMessage("stock must be in number").escape(),
 body("discountoffer").optional().isInt({min:0,max:100}).withMessage("discountOffer must be a number  ").escape(),
       body("ingredients").optional().customSanitizer((value, {req})=>{

         if(typeof value ==="String"){
            return value = [value]
         }
         else{
           return  value
         }

       }).isArray().escape(),

       body("SkinType").optional().trim().escape().isString().withMessage("skintype must be string"),

      //  body("discount").optional().toInt().trim().escape(),






              ]


             
               const validateUpdateProduct = [
                  body("name").optional().trim().escape().isString().notEmpty().withMessage("Product Name shouldn't be empty"),
                
                  body("description").optional().trim().escape().isString().notEmpty().withMessage("description must not be empty"),
                
                  body("price").optional().isInt().custom((value, { req }) => {
                    if (value < 0) {
                      throw new Error("price must not be less than zero");
                    } else {
                      return true;
                    }
                  }).escape(),
                
                  body("category").optional().escape().customSanitizer((value, { req }) => {
                    if (typeof value === "string") {
                      return [value]; 
                    } else {
                      return value;
                    }
                  }).isArray().withMessage("category must be an array"),
                
                  body("brand").optional().trim().escape().isString().withMessage("Brand name must be String"),
                
                  body('images')
                    .optional()
                    .customSanitizer(value => (typeof value === 'string' ? [value] : value)) 
                    .isArray().withMessage('Images must be an array'),
                
                  body('images.*')
                    .optional()
                    .isString().withMessage('Each image must be a string'),
                
                  body("stock").optional().trim().isInt().withMessage("stock must be a number").escape(),
                
                  body("discountoffer").optional().isString().withMessage("discountOffer must be a string").escape(),
                
                  body("ingredients").optional().customSanitizer((value, { req }) => {
                    if (typeof value === "string") {
                      return [value]; // If it's a string, convert it into an array
                    } else {
                      return value; // Otherwise, return the value as is
                    }
                  }).isArray().escape(),
                
                  body("SkinType").optional().trim().escape().isString().withMessage("SkinType must be a string"),
                
                  body("discount").optional().toInt().trim().escape(),
                ]



                const validateQueries = [
                  query("pageNumber").toInt().escape().trim(),
                  query("category").optional().escape().trim(),

                  query("brand").optional().trim().escape(),
                  query("priceRange").optional().isString().escape()
                ]
              

                


     module.exports = {
        validatesignup,
        validateCreateProduct,
        validateUpdateProduct,
        validateQueries
     }