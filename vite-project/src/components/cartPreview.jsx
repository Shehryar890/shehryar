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
     
  const handblurclose =()=>{
    dispatch(blurredActions.blurclosed());
   
  }


 

  useEffect(() => {
    // GSAP animation for the cart sliding in from the right when component is mounted
    gsap.fromTo(
      cartRef.current,
      { x: "100%" }, // Start from outside the screen (right side)
      { x: 0, duration: 0.8, ease: "power3.out" } // Slide in smoothly
    );
  }, []); // Empty dependency array to ensure it runs once when the component is mounted

  const handleMouseClose = () => {
    // GSAP animation for the cart sliding out to the right
    gsap.to(cartRef.current, {
      x: "100%", // Move cart out of the screen
      duration: 0.8,
      ease: "power3.in", // Ease for the close animation
      onComplete: () => {
        // After the animation completes, dispatch the close action
        dispatch(dropdownActions.closeAll())
      },
    });
  };

  return (
    <>
      {/* Cart Preview */}
      <div
        ref={cartRef}
        className="fixed top-0 flex-col right-0 h-full md:w-1/4 w-full bg-white shadow-lg z-50 transform translate-x-full"
      >
        <div className="md:flex md:items-center md:justify-between md: border-b-2 md:border-silver md:mb-8 md:p-8 ">
          <h1 className="font-montserrat font-bold">My Cart
          <span className="ml-5 md:font-nunito md:text-black md:rounded-lg  ">
            0 Items 
          </span>
          </h1>
          <button
            className="top-4 right-4 font-bold text-4xl text-gray-600 hover:text-red-500 transition duration-300"
            onClick={() =>{ handleMouseClose()
              handblurclose()
            }
            }
          >
            <IoIosClose />
          </button>
        </div>
        {/* Cart Content */}
        <div className="p-6 ">
          <div className="flex flex-col items-center mb-4  border-b-2 py-10">
            <img
              src="./public/cartempty.png"
              alt="Cart Empty"
              className="w-1/2 mb-2"
            />
            <h3 className="text-lg font-bold text-gray-800">
              Your Cart is Empty
            </h3>
          </div>

          <div className="flex-col font-sm ms:flex-col ms:items-center gap-4 sm:ml-7">
        
       
            <div className="ms:px-4 ms:py-5 ms:bg-slate-200 ms:rounded-lg ms:text-center ms:mb-10 ms:hover:bg-orange-600 ms:hover:text-white">
              <Link to="/" className="text-lg font-bold transition duration-300">
             Buy something 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPreview;
