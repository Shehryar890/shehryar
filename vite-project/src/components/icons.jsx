import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { BsMinecart } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { AiOutlineAlignRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { dropdownActions } from "../../store/dropdown";
import { hamburgerActions } from "../../store/hamburger";
import { blurredActions } from "../../store/dropdown";


const Icons = () => {
  const dispatch = useDispatch ();




  const isblurred = () => {
                 dispatch(blurredActions.isblurred());
            
  };

       const handleMouseEnter  = (dropdown)=>{
         dispatch(dropdownActions.toggledropdown(dropdown));
  
       }
       const handlehamburger = ()=>{
        dispatch(hamburgerActions.isOpen());
       }

  return (
    <>
      <div className="flex justify-center gap-1 items-center lg:gap-3  text-black">
        
        <div>
          <IoIosSearch className="font-bold size-4 xs:size-4 lg:size-6" />
        </div>

     

        <div className="relative">
          <CiStar className="hidden md:block size-4 lg:size-6" />
          <span className=" hidden   xs:hidden  md:hidden ms:hidden sm:hidden  lg:absolute lg:top-[-20%] lg:right-[-10%] lg:bg-red-500 lg:text-white lg:text-xs lg:font-bold lg:rounded-full lg:w-4 lg:h-4 lg:flex lg:items-center lg:justify-center">
            0
          </span>
        </div>

        <div className="relative">
          <BsMinecart className="font-bold size-4 xs:size-4 sm:size-4 lg:size-6 cursor-pointer" 
            onClick = {()=>{
              
              
              handleMouseEnter('cart')  
              isblurred();
       
            }}
    
          />
          <span className="  absolute top-[-30%]   lg:top-[-25%] lg:right-[-10%]  text-red-500 right[-30%] text-xs font-bold rounded-full lg:w-4 lg:h-4 flex items-center justify-center lg:text-white lg:bg-red-500">
            0
          </span>
        </div>
        <div>
          <AiOutlineAlignRight className="hidden md:block size-4 lg:size-6" 
          onClick = {()=>{handleMouseEnter('loginpreview')


             isblurred();
          }}
          
          />
        </div>

        <div>
          <RxHamburgerMenu className="font-bold size-4 xs:size-4 lg:size-6 sm:hidden" 
          onClick = 
            {()=>
              {handlehamburger()
            
    

            }}
          
        
          
          />
        </div>

      </div>
    </>
  );
};

export default Icons;
