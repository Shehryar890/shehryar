const Cart = require('../models/cartSchema');
const Product = require('../models/product');

// Get all items in user's cart
const getcartItems = async (req, res) => {
    const { userId } = req.params; // Correct `req.paramas` to `req.params`
    
    try {
        const cartItems = await Cart.find({ userId });


        let totalPrice = 0;
        cartItems.forEach((cartItem) => {
            totalPrice+=cartItem.price*cartItem.quantity;

           
        }) 
        let shippingPrice = 0
       if(totalPrice<50)
       {
        shippingPrice = 5;
       }
       else{
        shippingPrice = 0;
       }
        res.status(200).json({ cartItems, totalPrice, shippingPrice });







    } catch (error) {
        return res.status(500).json({ message: 'Error fetching cart items', error });
    }

   

}

// Add product to cart (or increment quantity)
const addPost = async (req, res, next) => {
    const { productId, userId, name, price, details, image } = req.body;
    
    try {
        let cartItem = await Cart.findOne({ productId, userId });  // Use Cart model instead of Product

        if (cartItem) {
            cartItem.quantity += 1; // Increment quantity if already in cart
            await cartItem.save();
        } else {
            cartItem = new Cart({
                productId,
                userId,
                name,
                price,
                details,
                image,
                quantity: 1
            });
            await cartItem.save();
        }

        return res.status(200).json(cartItem); // Send back the updated or newly created cart item
    } catch (error) {
        return res.status(500).json({ message: 'Error adding item to cart', error });
    }
}

// Delete item from cart
const deleteCart = async (req, res, next) => {
    const { productId, userId } = req.params; // Correct to use `req.params` (not `req.body`)

    try {
        const cartItem = await Cart.findOneAndDelete({ productId, userId });
        
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting item from cart', error });
    }
}

module.exports = {
    getcartItems,
    addPost,
    deleteCart
}
