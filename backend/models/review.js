const mongoose = require('mongoose')

   
const reviewScehma = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    
    rating: { type: Number, required: true },
 reviewmessage:  {type: String, required: true} 
}

,{timestamps:true})

const Review = mongoose.model('Review', reviewScehma)
module.exports =Review;