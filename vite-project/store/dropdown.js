 import { createSlice } from '@reduxjs/toolkit';



 const initialState = {
    
    allProducts :false,
    shop:false, 
    blog:false,
    Pages: false,
    cart:false,
    loginpreview:false,
    Hamburger:false,
    

 }
   

 

 const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,

    reducers: {

        toggledropdown: (state,action)=>{
            for(let key in state){
                state[key]= false;
                
            }
            state[action.payload]= true;
         ;

        },

        closeAll :(state, action)=>{
            for(let key in state){
                state[key]= false;
    
                
            }

        }
    











    },
 });
 const initial_State ={
    isblurred:false,
 }

 const blurredSlice = createSlice({
    name: 'blurred',
 initialState:initial_State,
    reducers : {
        isblurred:(state,action)=>{

            state.isblurred = true;
        }
    ,
    blurclosed :(state, action)=>{
        state.isblurred = false;
    }
    },

 })
 
             

 export const dropdownActions = dropdownSlice.actions; // Exporting action creators
 export const dropdownReducer = dropdownSlice.reducer;
 export const blurredActions = blurredSlice.actions;
 export const blurredReducer = blurredSlice.reducer;
