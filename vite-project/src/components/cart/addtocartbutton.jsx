


 import axios from "axios" 

 import { useState  } from "react"
 
 import { dropdownActions } from "../../../store/dropdown.js";

 
 import { cartSliceActions, getCart } from "../../../store/cart";
 
 import { useDispatch, useSelector } from 'react-redux';

 import { showSuccessToast , showErrorToast , loginerror } from "../../lib/toasters.jsx";


import Loader from "../loadingspinner";
  const AddcartButton = ({productId , disabled}) =>{
 
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
       dispatch(dropdownActions.toggledropdown('cart'));
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
      <button
        onClick={handlecart}
        disabled={disabled}
        className={`mt-4 w-full py-2 rounded-md font-semibold text-white transition
          ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#d65a31] hover:bg-black "
          }`}
      >
        {disabled ? "Out of Stock" : "Add to Cart"}
      </button>
    )}
  </>
);
    

            


            


  

        






  }


  export default  AddcartButton