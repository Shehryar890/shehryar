import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const LoginIcon = () => {
  const users = useSelector((state) => state.user.users);
  const [isopen, setopen] = useState(false);
  const [islogout, setlogout] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8345/logout/user", {
        withCredentials: true,
      });

      console.log(response.data);
      setlogout(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Profile Image / User Icon */}
      <div onClick={() => setopen(!isopen)} className="cursor-pointer">
        {users?.image ? (
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 shadow-md hover:shadow-lg transition-all">
            <img src={users.image} alt="User" className="w-full h-full object-cover" />
          </div>
        ) : (
          <CiUser className="text-3xl" />
        )}
      </div>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isopen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full mt-6 w-56 h-60 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200 
                       left-[-7rem] -translate-x-1/2"
          >
            {users?.image ? (
              <>
                <h1 className="text-lg text-center font-bold font-nunito mb-3  ">{users.userName}</h1>
                <button
                  onClick={handleLogout}
                  className="mt-3 px-4 py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 ">
                <Link
                  to="/login"
                  
                  onClick=
                  {() => setopen(!open)}
                  className="px-4 py-3 mb-4 mt-2   bg-slate-200 rounded-lg text-center hover:bg-orange-600 hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 bg-slate-200 rounded-lg text-center hover:bg-orange-600 hover:text-white transition duration-300"
               
               onClick=
                {() => setopen(!open)}
               
               >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show logout message if logged out */}
      {islogout && <p className="mt-2 text-green-600">User logged out successfully</p>}
    </div>
  );
};

export default LoginIcon;
