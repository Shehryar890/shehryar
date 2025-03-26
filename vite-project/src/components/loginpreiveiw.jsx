import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { blurredActions } from "../../store/dropdown";

import { dropdownActions } from "../../store/dropdown";

const LoginPreview = () => {
  const loginRef = useRef(null);
  const dispatch = useDispatch();
 const handblurclose =()=>{
    dispatch(blurredActions.blurclosed());
   
  }
  useEffect(() => {
    // GSAP animation for the login preview sliding in from the right
    gsap.fromTo(
      loginRef.current,
      { x: "100%" },
      { x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleMouseClose = () => {
    // GSAP animation for the login preview sliding out to the right
    gsap.to(loginRef.current, {
      x: "100%",
      duration: 0.8,
      ease: "power3.in",
      onComplete: () => {
        // After the animation completes, dispatch the close action
        dispatch(dropdownActions.closeAll());
      },
    });
  };

  return (
    <div
      ref={loginRef}
      className="fixed top-0 flex-col right-0 h-full md:w-1/4 w-full bg-white shadow-lg z-50 transform translate-x-full overflow-y-auto"
    >
      <div className="md:flex md:items-center md:justify-between md:border-b-2 md:border-silver md:p-8 p-4">
        <h1 className="flex items-center font-montserrat font-bold text-lg md:text-xl">
          Costica
          </h1>
          <button
            className="ml-auto text-4xl text-gray-600 hover:text-red-500 transition duration-300"
            onClick={()=>{handleMouseClose(),
          handblurclose()
          }}
        
          >
            <IoIosClose />
          </button>
       
      </div>

      <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        <div>
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-4">
            Customer Account
          </h2>
          <div className="flex flex-col gap-2 md:gap-4">
      
            <Link
              to="/wishlist"
              className="px-3 py-4 md:px-4 md:py-5 bg-slate-200 rounded-lg text-center hover:bg-orange-600 hover:text-white transition duration-300 text-sm md:text-base"
            >
              Wishlist
            </Link>
            <Link
              to="/checkout"
              className="px-3 py-4 md:px-4 md:py-5 bg-slate-200 rounded-lg text-center hover:bg-orange-600 hover:text-white transition duration-300 text-sm md:text-base"
            >
              Checkout
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-4">
            Customer Services
          </h2>
          <div className="flex flex-col gap-2 md:gap-4">
            <Link
              to="/testimonial"
              className="px-3 py-4 md:px-4 md:py-5 bg-slate-200 rounded-lg text-center hover:bg-orange-600 hover:text-white transition duration-300 text-sm md:text-base"
            >
              Testimonial Page
            </Link>
            <Link
              to="/contact"
              className="px-3 py-4 md:px-4 md:py-5 bg-slate-200 rounded-lg text-center hover:bg-orange-600 hover:text-white transition duration-300 text-sm md:text-base"
            >
              Contact Us Page
            </Link>
            <Link
              to="/about"
              className="px-3 py-4 md:px-4 md:py-5 bg-slate-200 rounded-lg text-center hover:bg-orange-600 hover:text-white transition duration-300 text-sm md:text-base"
            >
              About Us Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPreview;
