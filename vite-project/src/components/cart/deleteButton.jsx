import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

 import { showSuccessToast , showErrorToast , loginerror } from "../../lib/toasters.jsx";


import Loader from "../loadingspinner";

import axios from "axios"
import { getCart } from "../../../store/cart";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";

 
 

 const DeleteButton = ({productId , disabled})=>{
    const [loading, setloading] = useState(false)
    const user = useSelector((state)=>state.user.users)
const dispatch  = useDispatch()
    const userid = user?.id;

    const deleteProduct = async ()=>{
        try{
            const response  = await axios.delete(`http://localhost:8345/cart/delete/${productId}/${userid}` , 

               
            )
               dispatch(getCart())


                showSuccessToast("Product successfully removed from cart")
         
        }
        catch(error){
            console.log(error.response)
            showErrorToast("something went wrong Product deletion failed")
        }

    }


return(
    <>
    {loading ? (
      // Loader replaces the button while loading
      <Loader small className="mx-auto my-3" />
    ) : (
     <button className="text-xs text-black hover:underline flex items-center gap-1">
          <TrashIcon   onClick={deleteProduct}  className="w-4 h-4 mt-4" size={50}
          
      
          />
    
        </button>
    )}
  </>
)

    
 }

 export default DeleteButton