const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
                name: { type: String, required: true },
                details: { type: String, required: true },
                brand: { type: String, required: true },
                image: { type: String, required: true }
            }
        ]
    },
    { timestamps: true }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
