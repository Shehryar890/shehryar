import Header from "./header"

import { useToastCleanup } from "../lib/toasters";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import Pagesdropdown  from "./allproducts"
import CartPreview from "./cartPreview";
import LoginPreview from "./loginpreiveiw";
import { Topscroll } from "../lib/toasters";
import HamburgerPreview from "./hamburger";
import Shopdropdown from "./shopdropdown";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { messageActions } from "../../store/succesfulmessage";
import { blurredActions } from "../../store/dropdown";
import BottomNav from "./bottomdiv/bottomdiv";
import { Toaster } from "sonner";



import { gsap } from "gsap";
import { fetchUserAction } from "../../store/user";
import { getCart } from "../../store/cart";



const Layout =()=>{
  


     const users  = useSelector((state)=>state.user.users)

     const user_id = users?.id;
console.log(user_id)
    const dropdown = useSelector(state=>state.dropdown)
    const dispatch = useDispatch();


    useEffect (()=>{
       dispatch(fetchUserAction());
        },
         []
         
      )
      useEffect(()=>{
        if(user_id){
          dispatch(getCart())
        }
        
      }, [user_id, dispatch]);

    
    const ismenu = useSelector(state=>state.hamburger.menu)
    const pages = useSelector(state=>state.dropdown.Pages)

    const username = useSelector(state=>state.username.userName)

    
   const success = useSelector(state=>state.successfulmsg.message)

                const blurred = useSelector(state=>state.blur.isblurred)
                console.log(blurred);
                const successRef = useRef(null)



                


                useEffect(() => {
                  if (success) {

                        dispatch(blurredActions.isblurred());
                    const tl = gsap.timeline();
                    tl.fromTo(
                      successRef.current,
                      { y: -100, opacity: 0, scale: 0.8 }, // Start hidden & slightly small
                      { y: "20vh", opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" } // Moves to center
                    )
                      .to(successRef.current, {
                        opacity: 0,
                        scale: 0.9, // Shrinks slightly before disappearing
                        duration: 0.6,
                        delay: 3
                        , // Stays visible for 2 seconds
                        ease: "power3.in",
                        onComplete: () => {
                          dispatch(messageActions.clearMessage());
                            dispatch(blurredActions.blurclosed());
                            
                        }
                      });
                  }
                }, [success, dispatch]);
                
  
    // const isdropdown = Object.values(dropdown).includes(true);
    
    // if(isdropdown){
    //     document.body.classList.add("body-blur");

    // }
    //            else{
    //             document.body.classList.remove("body-blur");

 
    //            }


    return(
        <>
        {Topscroll()}
                          {  useToastCleanup()}
                            {success && (
 <div
 ref={successRef}
 className="bg-[url('/promo.jpg')] bg-cover bg-center w-[70%] h-72 fixed left-1/2 top-0 transform -translate-x-1/2 rounded-[28px] shadow-lg text-lg flex items-center justify-center text-white font-medium gap-3 z-50 border border-gray-300"
>
 <span className="  text-black  text-4xl  px-4 py-2  font-bold text-pretty font-montserrat   rounded-lg">
   Welcome <span className="text-red-600"> {username}</span>
 </span>

</div>

)}
                            

{blurred && (
        <div className="fixed inset-0 backdrop-blur-md z-30"></div>
      )}
      
        <div className={` min-h-screen relative bg-white  ` }>
        <div  className = ' relative   w-auto   bg-white border border-gray-200 shadow-lg xs:p-6  lg:justify-between lg:items-center   '   >
<Header></Header>
</div>


   { dropdown.shop &&<Shopdropdown  ></Shopdropdown>}
   {dropdown.Pages && <Pagesdropdown ></Pagesdropdown>}
   {dropdown.cart && <CartPreview ></CartPreview>}
   {dropdown.loginpreview && <LoginPreview ></LoginPreview>}
   { ismenu&& <HamburgerPreview ></HamburgerPreview>}


   <main className="">
    <Outlet className="h-full w-full"></Outlet>
   </main>
   <BottomNav/>
   <Footer></Footer>
   </div>

  <Toaster position="top-center" richColors closeButton  />

    </>
    )
}

export default Layout;