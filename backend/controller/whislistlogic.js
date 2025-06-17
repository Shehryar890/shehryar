const Product = require('../models/product');
const Wishlist = require('../models/whislistschema'); // Corrected name

// Add an item to the wishlist
const addWhislist = async (req, res) => {
    const { productId, userId, name, details, brand, images } = req.body;

    try {
        // Check if the item is already in the wishlist
        let whislistItem = await Wishlist.findOne({ productId, userId });
        
        if (whislistItem) {
            return res.status(400).json({ msg: 'Item already in wishlist' });
        }

        // Create new wishlist item
        whislistItem = new Wishlist({
            userId,
            products: [{ productId, name, details, brand, images }]
        });

        await whislistItem.save();
        return res.status(200).json({ msg: 'Item added to wishlist', whislistItem });
    } catch (error) {
        return res.status(500).json({ msg: 'Error adding item to wishlist', error });
    }
};

// Get all wishlist items for a user
const getwhishItems = async (req, res) => {
    const { userId } = req.params;

    try {
        // Get all wishlist items for the user
        const whislistItems = await Wishlist.findOne({ userId });

        if (!whislistItems) {
            return res.status(404).json({ msg: 'No wishlist items found for this user' });
        }

        return res.status(200).json(whislistItems);
    } catch (error) {
        return res.status(500).json({ msg: 'Error fetching wishlist items', error });
    }
};

// Remove an item from the wishlist
const removeWishlistItem = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Find and remove the item from the wishlist
        const removedItem = await Wishlist.findOneAndUpdate(
            { userId },
            { $pull: { products: { productId } } },
            { new: true }
        );

        if (!removedItem) {
            return res.status(404).json({ msg: 'Item not found in wishlist' });
        }

        return res.status(200).json({ msg: 'Item removed from wishlist', removedItem });
    } catch (error) {
        return res.status(500).json({ msg: 'Error removing item from wishlist', error });
    }
};



module.exports = {
    addWhislist,
    getwhishItems,
    removeWishlistItem
};
