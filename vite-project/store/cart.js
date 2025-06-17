 import { createSlice } from '@reduxjs/toolkit';


 


 const  initialvalue= {
    cartitems:[],
    totalPrice:0,
    show:false,

    successmsg:false
    
    



 }


 const cartSlice  = createSlice({
    name:"cart",
    initialState:initialvalue,
    reducers:
    
    {
    getcart:(state,action)=>{

       state.cartitems = action.payload
     

    },
  
    setsuccessmsg:(state)=>{
            state.successmsg = true

    },
    settotalPrice :(state , action)=>{
        state.totalPrice=action.payload
    },


      setshow :(state)=>{
        state.show = true
    
    
      }

}
 })


 export const cartSliceActions= cartSlice.actions
 export const cartslicereducer  = cartSlice.reducer
