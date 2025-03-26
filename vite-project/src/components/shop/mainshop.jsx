

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// Using ES Module import syntax


const Shop =()=>{
                
 



       
        
                  
    return (

<>



 
<div className=" grid  grid-cols-3 h-full w-full mt-8  items-center justify-center mb-28  ">



    <div  className="h-[32rem] w-80 ml-10   "      >
    <img className="h-[28rem] w-full bg-contain object-contain object-top "  src=" \5806302758651f2e6aec4e413e66b34f.jpg " alt="" />
    <div className="mt-4">
  <Link to="/shop/Men"  
  

  className="text-center   px-32 py-2  mt-0 bg-black text-center text-white font-bold font-lora transition-all duration-300 ease-in-out  hover:bg-orange-400  " >Men</Link>

  </div>
    </div>
    <div  className="h-[32rem] w-80 ml-20">
    <img className="h-[28rem]  w-full bg-contain object-contain object-top "  src="/f4a52895e8b42dd5eb9d1b05cce27937.jpg" alt="" ></img>

    <div className="mt-4">
  <Link to="/shop/Women"
  
  
  className="text-center   px-28 py-2 mt-[30%]    hover:bg-orange-400  bg-black text-center text-white font-bold font-lora transition-all duration-300 ease-in-out"   >Women</Link>
  </div>
    </div>

<div
 className="h-[32rem] w-80  "
>
<img className="h-[28rem] w-full  w-full bg-contain object-cover object-top  "  src="/b3602307180f7f3948e1a121e28de6ec.jpg" alt="" ></img>

<div className="mt-4">

<Link to='/shop/Skincare'


className="text-center    px-28 py-2 mt-[30%]    hover:bg-orange-400  bg-black text-center text-white font-bold font-lora transition-all duration-300 ease-in-out"   >Skincare</Link>
</div>

</div>
          


</div>











        




</>


    )
          




}


export default  Shop;