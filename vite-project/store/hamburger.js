 
 import { createSlice } from "@reduxjs/toolkit";

             


  const initialState = {
    submenu : 'menu',
    menu:false,
  }

  const hamburgersubSlice = createSlice({
    name:"hamburger", 

    initialState :initialState,
    reducers: {

isOpen:(state)=>{
    state.menu = true;
  
},
isClose:(state)=>{
 state.menu = false;
 
},
 setsubmenu :(state, action)=>{
    state.submenu = action.payload;


 }


    }
  })

  export const hamburgerActions  = hamburgersubSlice.actions;
  export const hamburgerReducer = hamburgersubSlice.reducer;