import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropdownActions } from "../../store/dropdown";
import Shopdropdown from "./shopdropdown"; // Import Shopdropdown
import { Link } from "react-router-dom";

const NavIcons = () => {
  const dispatch = useDispatch();
  const dropdown = useSelector((state) => state.dropdown);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (dropdownName) => {
    dispatch(dropdownActions.toggledropdown(dropdownName));
    setHovered(true);
  };

  const handleMouseClose = () => {
    dispatch(dropdownActions.closeAll());
    setHovered(false);
  };

  return (
    <nav

 
    
    
    
    
    className="hidden sm:flex sm:items-center sm:no-blur   text-black  xs:hidden sm:visible  sm:justify-center sm:gap-5 ">
      <div className="cursor-pointer
      hover:text-orange-600 
      
      "
      onMouseEnter={() => handleMouseClose()}
      > <Link to="/">Home</Link></div>

      <div
        className="relative cursor-pointer  hover:text-orange-600 " // Added relative here
        onMouseEnter={() => handleMouseEnter("shop")}
        onClick= {() => handleMouseClose("shop")}
     
      >
      <Link to="/shop">Shop</Link>  
        {/* Conditionally render Shopdropdown when hovered */}
      
    
      </div>

      <div
        className="cursor-pointer  hover:text-orange-600 "
        onMouseEnter={() => handleMouseEnter("allProducts")}
        onMouseLeave={() => handleMouseClose("allProducts")}
      >
        All Products
      </div>
      <div
        className="cursor-pointer    hover:text-orange-600 "
        onMouseEnter={() => handleMouseEnter("Blog")}
        onMouseLeave={() => handleMouseClose("Blog")}
      >
        Blog
      </div>
      <div
        className="cursor-pointer hover:text-orange-600 "
        onMouseEnter={() => handleMouseEnter("Pages")}
        onClick={() => handleMouseClose("Pages")}
      ><Link  to = "/cart">Cart</Link>
      </div>

      <div
      

        className="cursor-pointer hover:text-orange-600 "
        onMouseEnter={() => handleMouseEnter("Admin")}
        onClick={() => handleMouseClose("Admin")}
      ><Link  to = "/adminpanel">Admin</Link>
      </div>
    </nav>
  );
};

export default NavIcons;
