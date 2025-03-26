import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dropdownActions } from "../../store/dropdown";

const Pagesdropdown = () => {
  const dispatch = useDispatch();
  const dropdown = useSelector((state) => state.dropdown);

  const handleMouseClose = () => {
    dispatch(dropdownActions.closeAll());
  };

  return (
    <div
      className={`absolute top-20 left-[65%] transform -translate-x-1/2 border bg-white text-gray-800 shadow-lg rounded-md w-72 h-72 p-7 z-50 
        transition-all duration-300 ease-in-out opacity-0 scale-95
        ${dropdown.Pages ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      onMouseLeave={handleMouseClose}
    >
      <ul className="flex flex-col gap-2 w-full">
      <li   
        className="w-full">
          <Link
            to="/contact us"
            className="block px-14 py-2 text-center  text-slate-600 text-xl font-nunito hover:bg-gray-100 rounded-md transition hover:text-orange-500"
          >
           404 page
          </Link>
        </li>
        <li   
        className="w-full">
          <Link
            to="/contact us"
            className="block px-4 py-2 text-center  text-slate-600 text-xl font-nunito hover:bg-gray-100 rounded-md transition hover:text-orange-500"
          >
            Contact Us
          </Link>
        </li>
        <li 
              >
          <Link
            to="/testimonial page"
            className="block px-4 py-2 text-center  text-slate-600 text-xl font-nunito hover:bg-gray-100 rounded-md transition hover:text-orange-500"
          >
            Testimonial Page
          </Link>
        </li>
        <li>
          <Link
            to="/store location"
            className="block px-4 py-2 text-center text-slate-600 text-xl font-nunito hover:bg-gray-100 rounded-md transition hover:text-orange-500"
          >
            Store Location
          </Link>
        </li>
        <li>
          <Link
            to="/about us"
            className="block px-4 py-2 text-center text-slate-600 text-xl font-nunito hover:bg-gray-100 rounded-md transition hover:text-orange-500"
          >
            About Us
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagesdropdown;
