

import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsBag } from "react-icons/bs";


const BottomNav = () => {
  return (
    <div className="  md:hidden  fixed bottom-0 left-0 w-full bg-white  shadow-lg rounded-lg z-50 border  b-2 p-2">
      <div className="grid grid-cols-2 xs:grid-cols-2 mss:grid-cols-4 gap-2 w-full">
    
        <Link to="/" className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-[#ea445a]">
          <AiOutlineHome className="text-2xl" />
          <span className="text-xs font-semibold">Home</span>
        </Link>

        <Link to="/shop" className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-[#ea445a]">
          <BsBag className="text-2xl" />
          <span className="text-xs font-semibold">Shop</span>
        </Link>

      
        <Link to="/wishlist" className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-[#ea445a]">
          <AiOutlineHeart className="text-2xl" />
          <span className="text-xs font-semibold">Wishlist</span>
        </Link>

     
        <Link to="/account" className="flex flex-col items-center justify-center p-3 text-gray-700 hover:text-[#ea445a]">
          <AiOutlineUser className="text-2xl" />
          <span className="text-xs font-semibold">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
