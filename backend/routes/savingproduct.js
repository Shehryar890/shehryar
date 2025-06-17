const express   = require('express');
const router = express.Router();
const upload   = require( '../middlerwares/multer');
const {validateCreateProduct , validateUpdateProduct}= require( '../middlerwares/express-validations/bodyreqhandler')
 const runvalidationMiddelware = require( '../middlerwares/express-validations/runvalidator')
const {metadata} = require('../middlerwares/csrf/fetchmetadata')
const { csrfProtection }  = require( "../middlerwares/csrf/csrftoken");
  

const {createProduct } = require('../controller/adminsavingproducts')


const {updateproduct} = require("../controller/allproducts")






router.post('/product', upload.array("images"),   createProduct )

router.patch("/theproduct/:id" ,    upload.array("images" , 5)  , updateproduct)

          module.exports = router;


          
