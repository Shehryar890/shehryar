const { transformAuthInfo } = require('passport');
const Product   = require('../models/product');

             
        const allProducts  =  async (req, res)=>{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;

            const skip = (page-1)*limit;
            try{
                const products  = await Product.find().skip(skip).limit(limit);
                const total = await Product.count();
                res.json({
                    products,
                    total,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page


                })
            }
            catch(err){
                console.error(err);
                res.status(500).json({message: 'Server Error'})
            }
        }

        module.exports = {allProducts};