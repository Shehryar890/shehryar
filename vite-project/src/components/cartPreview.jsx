import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dropdownActions } from "../../store/dropdown";
import { IoIosClose } from "react-icons/io";
import { blurredActions } from "../../store/dropdown";

const CartPreview = () => {
  const cartRef = useRef(null);
  const dispatch = useDispatch();

  const handblurclose = () => {
    dispatch(blurredActions.blurclosed());
  };

  const cart = useSelector((state) => state.cart.cartitems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    gsap.fromTo(
      cartRef.current,
      { x: "100%" },
      { x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleMouseClose = () => {
    gsap.to(cartRef.current, {
      x: "100%",
      duration: 0.8,
      ease: "power3.in",
      onComplete: () => {
        dispatch(dropdownActions.closeAll());
      },
    });
  };

  return (
    <div
      ref={cartRef}
      className="fixed top-0 right-0 h-full w-full md:w-1/4 bg-white shadow-lg z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="font-bold text-lg font-montserrat">
          My Cart{" "}
          <span className="ml-2 font-normal text-sm text-gray-500">
            ({cart.length})
          </span>
        </h1>
        <button
          className="text-3xl text-gray-600 hover:text-red-500"
          onClick={() => {
            handleMouseClose();
            handblurclose();
          }}
        >
          <IoIosClose />
        </button>
      </div>

      {cart.length !== 0 ? (
        <>
          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 mb-4 border-b pb-3"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold  font-bold font-xl mb-4">{item.name}</h3>
                  <p className="text-gray-600 text-sm font-bold font-nunito">Price: ${item.price}</p>
                  <p className="text-gray-600 text-sm font-bold font-nunito">Quantity:{item.quantity}</p>

            
                </div>
              </div>
            ))}
          </div>

          {/* Footer Total & Button */}
          <div className="border-t p-4 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-md font-semibold">Total</span>
              <span className="text-md font-bold">${totalPrice}</span>
            </div>
            <Link

            onClick={() => {
            handleMouseClose();
            handblurclose();
          }}
              to="/cart"
              className="block text-center w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              View Cart
            </Link>
          </div>
        </>
      ) : (
        // Empty Cart
        <div className="p-6">
          <div className="flex flex-col items-center mb-4 border-b-2 py-10">
            <img
              src="./public/cartempty.png"
              alt="Cart Empty"
              className="w-1/2 mb-2"
            />
            <h3 className="text-lg font-bold text-gray-800">
              Your Cart is Empty
            </h3>
          </div>
          <div className="text-center mt-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-slate-200 rounded hover:bg-orange-600 hover:text-white transition font-bold"
            >
              Buy Something
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPreview;
