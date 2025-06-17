import { toast } from "sonner";
import { Link, useLocation } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";


export const showSuccessToast = (msg = "Success", desc = "") => {
  toast.success(`${msg}${desc ? `: ${desc}` : ""}`);
};

export const showErrorToast = (msg = "Error", desc = "") => {
  toast.error(`${msg}${desc ? `: ${desc}` : ""}`);
};

export const showInfoToast = (msg = "Info", desc = "") => {
  toast.info(`${msg}${desc ? `: ${desc}` : ""}`);
};


export const loginerror = (msg = "You need to login to continue") => {
  toast.custom(
    (t) => (
      <div
        className={`relative max-w-sm w-full bg-red-50 border border-[#f5f5f5] rounded-lg shadow-lg p-4 flex flex-col gap-3 ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
 
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
        >
          <IoIosClose className="text-black font-bold" size={30} />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="text-red-600 text-xl mt-1">
            <FaExclamationTriangle />
          </div>
          <div className="flex flex-col">
            <h3 className="text-red-800 font-bold text-md">{msg}</h3>
            <p className="text-gray-700 text-sm mt-1">
              Please login first so you can add to cart.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Link
            to="/login"
            className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1 text-sm bg-[#cccc] text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    ),
    {
      duration: 3000,
      position: "top-center",
    }
  );
};


export const useToastCleanup = () => {
  const location = useLocation();

  useEffect(() => {
    toast.dismiss(); // dismisses all toasts when path changes
  }, [location.pathname]);
};


export const Topscroll = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
