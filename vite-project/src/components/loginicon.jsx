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
        {users? (
          <div className="xs:hidden sm:block  sm-w-8 sm:h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-md hover:shadow-lg transition-all">

       {
        !users.image?(
          <span className="text-sm flex items-center justify-center w-full h-full bg-gray-400 text-black font-semibold rounded-full">
          {users.userName.slice(0, 2).toUpperCase()}
        </span>
        ):(
          <img src={users.image} alt="User" className="w-full h-full object-cover" />

         
        )
       }
            

           
          
          </div>
        ) : (
          <CiUser className=" lg:text-xl xs:hidden sm:block" />
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
            className="  hidden sm:block  absolute top-full mt-8  lg:w-48 sm:w-32 sm:ml-[-5rem]  lg:ml-[-1rem] sm:h-56 sm:px-4 bg-white shadow-lg rounded-lg md:p-4 z-50 border border-gray-200 
           "
          >
            {users? (
              <>

                <h1 className=" text-lg  text-center font-bold font-nunito mt-3 mb-2 text-black    ">{users.userName}</h1>
                <button
                  onClick={handleLogout}
                  className="mt-3 xs:px-4 xs:py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className=" hidden sm:flex flex-col gap-3  ">
                <Link
                  to="/login"
                  
                  onClick=
                  {() => setopen(!open)}
                  className="px-4 py-3 mb-4 mt-2  rounded-lg text-center bg-orange-600  text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3  rounded-lg text-center bg-orange-600 text-white transition duration-300"
               
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
