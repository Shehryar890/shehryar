import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";
import { dropdownActions } from "../../store/dropdown";

const Shopdropdown = () => {
  const dispatch = useDispatch();
 
 
 

  const handleMouseLeave = () => {
 dispatch(dropdownActions.closeAll());
  };

  return (

      <div
        className={`absolute top-[80px] left-0   w-full  bg-white shadow-lg p-6 z-50 border border-gray-200 mt-2 
            transition-shadow duration-300 ease-in-out

            
          `}
  
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Flex Container for Categories */}
        <div className="flex justify-between gap-8 ">
          {/* Flash Deals */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800">Flash Deals</h3>
            <div className="flex flex-col gap-4">
              <Link to="/deal1" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Deal 1
              </Link>
              <Link to="/deal2" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Deal 2
              </Link>
              <Link to="/deal3" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Deal 3
              </Link>
              <Link to="/deal4" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Deal 4
              </Link>
            </div>
          </div>

          {/* Men */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800">Men</h3>
            <div className="flex flex-col gap-4">
              <Link to="/shirts" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Shirts
              </Link>
              <Link to="/trousers" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Trousers
              </Link>
              <Link to="/accessories" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Accessories
              </Link>
              <Link to="/footwear" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Footwear
              </Link>
              <Link to="/watches" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Watches
              </Link>
            </div>
          </div>

          {/* Women */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800">Women</h3>
            <div className="flex flex-col gap-4">
              <Link to="/dresses" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Dresses
              </Link>
              <Link to="/handbags" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Handbags
              </Link>
              <Link to="/jewelry" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Jewelry
              </Link>
              <Link to="/footwear" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Footwear
              </Link>
              <Link to="/makeup" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Makeup
              </Link>
            </div>
          </div>

          {/* Skincare */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-gray-800">Skincare</h3>
            <div className="flex flex-col gap-4">
              <Link to="/moisturizers" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Moisturizers
              </Link>
              <Link to="/cleansers" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Cleansers
              </Link>
              <Link to="/serums" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Serums
              </Link>
              <Link to="/sunscreens" className="text-lg text-gray-700 hover:text-gray-900 transition duration- hover:text-orange-500">
                Sunscreens
              </Link>
              <Link to="/toners" className="text-lg text-gray-700 hover:text-gray-900 transition duration-300 hover:text-orange-500">
                Toners
              </Link>
            </div>
          </div>
        </div>
      </div>
    )

};

export default Shopdropdown;
