const User = require("../models/user")
const { Cart } = require("../models/cartSchema")
const Product = require("../models/product")
const Coupon = require("../models/coupon")
const mongoose = require("mongoose")

function calculatePrice(items) {
  return parseFloat(items.reduce((accumulator, item) => accumulator + item.price, 0));
}

async function checkandapplycoupon(totalPrice, userid) {
  const coupons = await Coupon.find({
    isActive: true,
    maxUses: { $gt: 0 },
    usedBy: { $ne: userid },
    $or: [
      { isFirstLogin: true },
      { isShippingDiscount: true },
      { isWelcomeback: true }
    ]
  });

  const user = await User.findById(userid);
  const currentDate = new Date();
  const twoMonthsAgo = new Date(currentDate);
  twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

  let totalDiscount = 0;
  let appliedCoupons = [];

  coupons.forEach(coupon => {
    let discount = 0;
    let eligible = false;

    if (coupon.isFirstLogin && user.hasLoggedIn === false) eligible = true;
    if (coupon.isShippingDiscount && coupon.mincartValue < totalPrice) eligible = true;
    if (coupon.isWelcomeback && user.lastActiveDate <= twoMonthsAgo) eligible = true;

    if (eligible) {
      if (coupon.type === "percentage") {
        discount = (totalPrice * coupon.discountedValue) / 100;
      } else {
        discount = coupon.discountedValue;
      }

      discount = parseFloat(discount.toFixed(2));
      totalDiscount += discount;

      appliedCoupons.push({
        _id: coupon._id,
        name: coupon.name,
        discountedValue: coupon.discountedValue,
        type: coupon.type,
        discountApplied: discount,
        // code: coupon.code || null
      });
    }
  });

  const finalPrice = Math.max(0, totalPrice - totalDiscount);

  return {
    finalPrice,
    totalDiscount,
    appliedCoupons
  };
}

const addtoCart = async (req, res) => {
  const { userID, productID } = req.body;
  const productexists = await Product.findById(productID)
  const discountedPrice = productexists.discount || productexists.price
  let totalPrice = 0;

  try {
    const user = await Cart.findOne({ userId: userID }).populate("items.productId");

    if (user) {
      const existingItem = user.items.find(item =>
        item.productId.equals(productexists._id)
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price = discountedPrice * existingItem.quantity;
        totalPrice = calculatePrice(user.items);
        if (isNaN(totalPrice)) totalPrice = 0;
        await user.save();
      } else {
        user.items.push({
          productId: productID,
          quantity: 1,
          price: discountedPrice * 1
        });
        await user.populate("items.productId");
        totalPrice = calculatePrice(user.items);
        if (isNaN(totalPrice)) totalPrice = 0;
        await user.save();
      }

      user.totalPrice = totalPrice;
      const { finalPrice, appliedCoupons } = await checkandapplycoupon(totalPrice, userID);
      user.totalPrice = finalPrice;
      user.appliedCoupons = appliedCoupons;
      await user.save();
    } else {
      const cart = new Cart({
        userId: userID,
        items: [{
          productId: productID,
          quantity: 1,
          price: discountedPrice * 1
        }]
      });

      await cart.save();
      await cart.populate("items.productId");

      cart.totalPrice = calculatePrice(cart.items);
      if (isNaN(cart.totalPrice)) cart.totalPrice = 0;

      const { finalPrice, appliedCoupons } = await checkandapplycoupon(cart.totalPrice, userID);
      cart.totalPrice = finalPrice;
      cart.appliedCoupons = appliedCoupons;

      await cart.save();
    }

    return res.json({
      success: true,
      message: "successfully done",
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const validateandapplyCoupon = async (req, res) => {
  const { usercode, userId } = req.body;

  const coupon = await Coupon.findOne({
    isActive: true,
    usedBy: { $ne: userId },
    maxUses: { $gt: 0 },
    code: usercode,
  });

  const user = await Cart.findOne({ userId: userId });
  const totalcart = user.totalPrice;
  let discount = 0;
  let aftercodecoupon = 0;
  const date = new Date();

  if (coupon && coupon.expiresAt > date) {
    if (coupon.type === "percentage") {
      discount = totalcart * (coupon.discountedValue / 100);
      aftercodecoupon += discount;
    } else {
      discount = coupon.discountedValue;
      aftercodecoupon += discount;
    }

    const finalPrice = totalcart - aftercodecoupon;
    user.totalPrice = finalPrice;

    coupon.usedBy.push(userId);
    coupon.maxUses -= 1;
    await coupon.save();
    await user.save();
  } else {
    return res.json({
      success: false,
      message: "your code is invalid"
    });
  }
}

const getCart = async (req, res) => {
  try {
    const { userid } = req.params;

    const usercart = await Cart.findOne({ userId: userid }).populate("items.productId");

    if (!usercart) {
      return res.status(404).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    const items = usercart.items
      .filter(item => item.productId)
      .map((item) => ({
        productId:item.productId._id,
        name: item.productId.name,
        price: item.price,
        images: item.productId.images[0],
        quantity: item.quantity,
      }));

    return res.status(200).json({
      success: true,
      totalPrice: usercart.totalPrice,
      appliedCoupons: usercart.appliedCoupons || [],
      userid: usercart.userId,
      items,
    });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

const deleteProduct = async (req, res) => {
  const { userid, productID } = req.body;

  try {
    let totalprice = 0;

    const productexists = await Product.findById(productID)
    const discountedPrice = productexists.discount || productexists.price;

    const user = await Cart.findOne({ userId: userid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User cart not found",
      });
    }

    const existingItem = user.items.find(item =>
      item.productId.equals(productID)
    );

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (existingItem.quantity <= 1) {
      user.items = user.items.filter(item => !item.productId.equals(productID));
    } else {
      existingItem.quantity -= 1;
      existingItem.price = discountedPrice * existingItem.quantity;
    }

    totalprice = calculatePrice(user.items);
    const { finalPrice, appliedCoupons } = await checkandapplycoupon(totalprice, userid);

    user.totalPrice = finalPrice;
    user.appliedCoupons = appliedCoupons;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });

  } catch (error) {
    console.log("Remove cart error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteFromCart = async (req, res) => {
  const { userid, productId } = req.params;
    const productexists = await Product.findById(productId)

  try {
    const cart = await Cart.findOne({ userId: userid });

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "User with this id didn't exist",
      });
    }

   cart.items = cart.items.filter(item => !item.productId.equals(productId));

    let totalPrice = calculatePrice(cart.items);
    const { finalPrice, appliedCoupons } = await checkandapplycoupon(totalPrice, userid);

    cart.totalPrice = finalPrice;
    cart.appliedCoupons = appliedCoupons;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Successfully deleted the product from cart"
    });
  } catch (error) {
    console.log(error.response);
    res.status(500).json({
      success: false,
      message: "internal server error"
    });
  }
};

const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart with this userId doesn't exist",
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    cart.appliedCoupons = [];

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addtoCart,
  deleteProduct,
  getCart,
  validateandapplyCoupon,
  deleteFromCart,
  clearCart
}
