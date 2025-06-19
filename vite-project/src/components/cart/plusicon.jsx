


 import axios from "axios" 

 import { useState  } from "react"

 
 import { cartSliceActions, getCart } from "../../../store/cart";
 import { useDispatch, useSelector } from 'react-redux';
//  import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
 

 import { showSuccessToast , showErrorToast , loginerror } from "../../lib/toasters.jsx";


import Loader from "../loadingspinner";
import { PlusIcon } from "@heroicons/react/24/outline";
  const Increment = ({productId , disabled}) =>{
 
const dispatch  = useDispatch()
const users  = useSelector((state)=>state.user.users)
const userid = users?.id


//   const user_id = users?._id;


            const [loading , setloading ]  = useState(false);
         

const handlecart  = async() =>{



    try{


     setloading(true)
      if(!users.id){

            loginerror()
            return
      }
        const response  = await axios.post("http://localhost:8345/cart/create"


            ,
           
            {
                productID :productId,
                userID :userid
            }
        )

     
      

     setloading(false)
       showSuccessToast("Successfully added to cart" , "")
       dispatch(getCart())

}
catch(error){

    console.log(error)
  showErrorToast("Failed to add items in cart")



} 
finally{
    setloading(false)
}
  

    
    





          


     



}



          return (
  <>
    {loading ? (
      // Loader replaces the button while loading
      <Loader small className="mx-auto my-3" />
    ) : (
     <button onClick={handlecart} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <PlusIcon className="w-4 h-4 text-gray-600" />
          </button>
    )}
  </>
);
    

            


            


  

        






  }


  export default  Increment