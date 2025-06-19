import { useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { showErrorToast, showSuccessToast } from "../../lib/toasters"
import { getCart } from "../../../store/cart"
import Loader from "../loadingspinner"

import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";


const Minus = ({productId})=>{


    const  [loading , setloading] = useState(false)


    const dispatch = useDispatch()

    const user  = useSelector((state)=>state.user.users)
    const userid = user ?.id


   const decreaseQuantity = async ()=>{

        try{
            setloading(true)
            const response  = await axios.patch(`http://localhost:8345/cart/remove`, 
               {
                productID:productId,
                userid:userid
               }
            )


            
            dispatch(getCart())
            
        }
        catch(error){
            console.log(error.response)
            showErrorToast("something went wrongs")
            
        }

    
    finally{
        setloading(false)
    }
    }


    return (

        <>

    {loading ?
        
       <Loader small className="mx-auto my-3" /> :(
             <button  onClick={()=>decreaseQuantity(productId)} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
            <MinusIcon className="w-4 h-4 text-gray-600" />
          </button>
        )
        


    }
    </>
    )




}


export default Minus;



