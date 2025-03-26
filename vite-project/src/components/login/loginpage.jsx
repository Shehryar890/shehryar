

import { SiGoogle } from "react-icons/si";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

 const LoginPage = ()=>{ 

                 

    return (
        <>
        <div className="flex items-center justify-center ">
        <div className="flex items-center  mt-3 p-4  bg-[#F5F5F7]   justify-center h-[32rem] w-[70%] rounded-[28px] shadow-lg">
   

            <div className="  mss:bg-white  flex-col  sm:h-full xs:bg-[CBCBCB] mss:ml-6 sm:ml-0  md:h-full md:w-full">
              
                <h1 className="text-center font-lora font-bold mss:text-3xl   xs:text-lg mt-10  text-black">LOGIN FORM</h1>
              
          
                <form action="" className="flex flex-col mt-10 items-center justify-center ">
                 

<label className="input input-bordered flex items-center gap-2 bg-white xs:w-44 xs:overflow-hidden text-black mb-10 mss:w-80">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="  mss:h-4 mss:w-4 opacity-70 text-black">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow outline-none" placeholder="Email" />
</label>



<label className="input input-bordered flex items-center gap-2 bg-white xs:w-44 xs:overflow-hidden text-black mb-10 mss:w-80">
   <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70 ">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg> 
  <input type="text" className="grow outline-none" placeholder="Enter Password" />
</label>
  {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70 ">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg> */}
 

<button className="btn no-animation mt-3 mss:w-52 text-pretty  bg-[#0000000] font-nunito text-white hover:bg-black  bg-black dark:text-white font-bold   xs:w-32  xs:text-sm">Login</button>
<button className="btn no-animation   mt-4 s  w-52 text-pretty   hover:bg-white font-nunito bg-white  text-black mss:font-bold xs:p-4  xs:text-sm ">
    

      <FcGoogle className=" xs:text-sm mss:font-bold mss:text-2xl"></FcGoogle>   <span className="xs:text-sm"> Sign in with Google </span></button>


                 </form>
            



                <p className=" text-black  text-center mt-8 font-nunito font-bold text-pretty">Dont have account  ?  <Link to = "/signup" className=" hover:text-blue-800  font-poppins text-blue-500 underline">Signup</Link></p>
            

            </div>
        

         <div className="h-full w-full ">

            <img  className=" xs:hidden sm:block sm:h-full sm:w-full sm:bg-center  md:h-full  md:overflow-hidden nd:w-full   md:bg-cover"  src="/loginpart3.jpg" alt="" />


         </div>
                   
        
        
        
        
        
        </div>
        </div>
        
        </>
    )


 }


 export default LoginPage;