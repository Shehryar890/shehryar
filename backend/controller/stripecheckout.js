const Stripe = require("stripe");
const { Cart } = require("../models/cartSchema");
const stripe = Stripe(process.env.STRIPE_SECRETKEY);
const Order = require("../models/order");

const setstripeCheckout = async (req, res) => {
  const { cartid, userid, shippingaddress, items } = req.body;


  if (!cartid || !userid || !shippingaddress || !items || !Array.isArray(items)) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100), 
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',

 
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',

      metadata: {
        userId: userid,
        cartId: cartid,
        shippingAddress: JSON.stringify(shippingaddress),
      },
    });

    return res.json({
      id: session.id,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const webhookchecking = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret); 
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: `Webhook error: ${error.message}`,
      });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const cartId = session.metadata.cartId;
      const userId = session.metadata.userId;
      const shippingAddress = JSON.parse(session.metadata?.shippingAddress || '{}');

      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart is empty',
        });
      }

      if (cart._id.toString() !== cartId) {
        return res.status(400).json({
          success: false,
          message: 'Cart ID mismatch',
        });
      }

      const newOrder = new Order({
        userId,
        isPaid: true,
        shippingAddress,
        cartItems: cart.items,
        totalPrice: cart.totalPrice,
        paymentMethod: 'Online',
        paymentStatus: 'Paid',
        status: 'processing',
      });

      await newOrder.save();

      await Cart.findOneAndDelete({ userId });

      return res.status(200).json({
        success: true,
        message: 'Your order has been placed',
        order: newOrder,
      });

    } else {
    
      return res.status(200).json({
        success: true,
        message: 'Event type not handled',
      });
    }

  } catch (error) {
    console.error('Webhook handler failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  setstripeCheckout,
  webhookchecking,
};
