import React, { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { hamburgerActions } from "../../store/hamburger";

const HamburgerPreview = () => {
  const hamburgerRef = useRef(null);
  const dispatch = useDispatch();
 

  const submenu = useSelector((state) => state.hamburger.submenu); // Access the submenu state

  useEffect(() => {
    // GSAP animation for the hamburger preview sliding in from the left
    gsap.fromTo(
      hamburgerRef.current,
      { x: "-100%" },
      { x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleMouseClose =   useCallback( () => {
    // GSAP animation for the hamburger preview sliding out to the left
    gsap.to(hamburgerRef.current, {
      x: "-100%",
      duration: 0.8,
      ease: "power3.in",
      onComplete: () => {
        dispatch(hamburgerActions.isClose());
      },
    });
  }, [dispatch]);

  const handleSubmenuClick = useCallback( (submenuValue) => {
    // Dispatch the action to change submenu
    dispatch(hamburgerActions.setsubmenu(submenuValue));
  }, [dispatch]);






  return (



          
    <div
      ref={hamburgerRef}
      className="fixed top-0 flex-col left-0 h-full md:w-1/4 w-full bg-white shadow-lg z-50 transform translate-x-full overflow-y-auto"
    >
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between md:border-b-2 md:border-silver md:p-8 p-4">
        <h1 className="flex items-center font-montserrat font-bold text-lg md:text-xl">
          Menu
        </h1>
        <button
          className="ml-auto text-4xl text-gray-600 hover:text-red-500 transition duration-300"
          onClick={handleMouseClose}
        >
          <IoIosClose />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 p-4 md:p-6 border-b-2 border-silver">
        <input
          type="text"
          placeholder="Enter Keyword"
          className="flex-1 p-3 border rounded-lg text-sm md:text-base"
        />
        <FiSearch className="text-sm text-2xl cursor-pointer text-sm " />
      </div>

      {/* Dynamic Center Section (submenus) */}
      <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6">
        {submenu === "menu" && (
          <>
            <Link
              to="/home"
              className="text-gray-800 text-sm md:text-base hover:text-orange-600 transition duration-300"
            >
              Home
            </Link>
            <div className="flex justify-between items-center text-gray-800 text-sm md:text-base hover:text-orange-600 transition duration-300">
              <span>Collection</span>
              <BiChevronRight
                className="font-bold text-lg cursor-pointer"
                onClick={() => handleSubmenuClick("collection")}
              />
            </div>
            <div className="flex justify-between items-center text-gray-800 text-sm md:text-base hover:text-orange-600 transition duration-300">
              <span>Pages</span>
              <BiChevronRight
                className="font-bold text-lg cursor-pointer"
                onClick={() => handleSubmenuClick("pages")}
              />
            </div>
            <Link
              to="/blog"
              className="text-gray-800 text-sm md:text-base hover:text-orange-600 transition duration-300"
            >
              Blog List
            </Link>
          </>
        )}

        {submenu === "collection" && (
          <div  className=" hover:text-orange-500  p-4 md:p-6 flex flex-col gap-4 md:gap-6 transition duration-400 transition-transform " >
          <BiChevronLeft 
       onClick={() => handleSubmenuClick("menu")}
          />
          <Link  to='/men' >Men</Link>
          <Link  to='/women'>Women</Link>
          <Link to='/skincare' >skincare</Link>
            
          </div>
        )}

        {submenu === "pages" && (
          <div  className=" hover:text-orange-500  p-4 md:p-6 flex flex-col gap-4 md:gap-6 transition duration-400 transition-transform overflow-y-auto " >
          <BiChevronLeft  className="size-7 font-bold right-0"
       onClick={() => handleSubmenuClick("menu")}
          />
          <Link  to='' >About us</Link>
          <Link  to='/testimonial'>Testimonial Page</Link>
          <Link to='/contactus' >Contact us</Link>
          <Link to='/aboutus' >About us</Link>
          
          <Link to='/Storedirection' >StoreLocation</Link>


            
          </div>
        )}
      </div>

      {/* Social Media & Contact */}
      <div className="p-4 md:p-6 border-t-2 border-silver">
        <div className="flex justify-center items-center gap-4 mb-6">
          <FaFacebook className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition duration-300" />
          <FaTwitter className="text-gray-600 text-2xl cursor-pointer hover:text-blue-400 transition duration-300" />
          <FaInstagram className="text-gray-600 text-2xl cursor-pointer hover:text-pink-500 transition duration-300" />
        </div>
        <div className="w-full">
          <FaEnvelope className="text-gray-600 text-2xl mb-2" />
          <p className="text-sm md:text-base text-gray-700">
            Call us on <br />{" "}
            <span className="black font-bold font-montserrat">+923034311186</span>
          </p>
          <p className="text-sm md:text-base text-gray-700">
            Contact us on{" "}
            <span className="black font-bold font-montserrat">sherymalik17786@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default  React.memo(HamburgerPreview);
