import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showErrorToast, showSuccessToast } from "../../lib/toasters"
import { getCart } from "../../../store/cart"
import axios from "axios"
import Loader from "../loadingspinner"



        const ClearCart = ({productId})=>{

const [loading , setloading] = useState(false)

const users = useSelector((state)=>state.user.users)

const userid = users?.id;
const dispatch = useDispatch()

const clearcart= async()=>{
    try{
        setloading(true)

        const response = await axios.put("http://localhost:8345/cart/clear" , 
        {    productId :productId, 
            userId :userid}
        )
        console.log(response.data)
        dispatch(getCart())
        showSuccessToast("Cart cleared Successfully")
    }
    catch(error){
        console.log(error.response)
        setloading(false)
        showErrorToast("Something went wrong")
    }
    finally{
        setloading(false)
    }
}



return (

<>
    {loading ?<Loader small className="mx-auto my-3"/>:(
<button  onClick={clearcart}  className="btn btn-wide">Clear Cart</button>
    ) }
    </>
)

            
        }

        export default ClearCart