import { createSlice } from '@reduxjs/toolkit';


const succesfulSlic = createSlice({
    name:"successfulmsg", 
    initialState:{
        message:  false,
    },

    reducers:{

        setMessage:(state, action)=>{
           state.message = true;
        },
     clearMessage:(state, action)=>{
        state.message = false;
     }
    }
})

export const messageActions = succesfulSlic.actions;

export const messageReducer = succesfulSlic.reducer;