


 import axios from "axios" 

 import { useState  } from "react"

 import { cartSliceActions } from "../../../store/cart";
 import { useDispatch, useSelector } from 'react-redux';

 import { showSuccessToast , showErrorToast , loginerror } from "../../lib/toasters.jsx";


import Loader from "../loadingspinner";
  const AddcartButton = ({productId , disabled}) =>{
 
const dispatch  = useDispatch()
const users  = useSelector((state)=>state.user.users)
const userid = users?.id
console.log(users);

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

     
        const getcartresponse = await axios.get(`http://localhost:8345/cart/get/${userid}`)
        console.log(getcartresponse)

        const cart = getcartresponse.data.items;
        const totalPrice = getcartresponse.data.total

        dispatch(cartSliceActions.getcart(cart))
        dispatch(cartSliceActions.settotalPrice(totalPrice))

     setloading(false)
       showSuccessToast("Successfully added to cart" , "")

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
                {loading &&  <Loader/>}

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
  

                </>
               

            )
    

            


            


  

        






  }


  export default  AddcartButton