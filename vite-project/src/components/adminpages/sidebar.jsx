
import Logo from "../logo";

import { CiBellOn } from "react-icons/ci";
import { Link } from "react-router-dom";

           const Sidebar = ()=>{

                         
                     return (


                        <>
                        
                        <div className="h-[100vh] bg-white   w-56  z-20  rounded-lg text-black text-bold
                            p-4  shadow-lg"> 


<img className="h-20 w-36"  src="/undraw_going-upwards_0y3z.svg" alt="Going Upwards Illustration" />

                           
                          <h1 className="text-lg  text-bold  font-bold text-center  text-red-600  text-3xl font-nunito">Costica</h1>
                                        


                                        <div className=" flex- mt-10 ">

                                            <h1><Link  to = "/adminpanel/products"><button>Product Mangemnet</button></Link></h1>
                                            <h1><Link><button>Order Managment</button></Link></h1>
                                          <h1> <Link><button>Users</button></Link></h1>  
                                            <h1> <Link><CiBellOn /></Link></h1>


                                        </div>



                        

                        </div>
                        
                        </>






















                     )



           }

           export default Sidebar;