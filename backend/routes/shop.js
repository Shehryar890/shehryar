const express = require('express');
const router = express.Router();
const { getbyCategory, getbysubcategory  , fetchPopupProducts, productdetail} = require('../controller/shoplogic')


router.get('/category/:categoryName/:subcategory/:productId' , productdetail) 
router.get('/:categoryName/:subcategory/', getbysubcategory)


 router.get('/:categoryName', getbyCategory);

router.get('/popup', fetchPopupProducts);


 module.exports= router;