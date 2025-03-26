const mongoose = require('mongoose');



const cartSchema  = new  mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'

    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    }


})

const Cart = mongoose.model('Cart', cartSchema);



module.exports = Cart;