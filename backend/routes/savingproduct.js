const express   = require('express');
const router = express.Router();
const upload   = require( '../middlerwares/multer');


const {createProduct} = require('../controller/adminsavingproducts')





router.post('/product', upload.array("images", 5), createProduct )

          module.exports = router;


          
