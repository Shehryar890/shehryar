import { createSlice } from '@reduxjs/toolkit';




const usernameSlice  = createSlice({
    name:'username',


    initialState:{
        userName:""
    },
    reducers:{
        setUsername:(state,action)=>{
            state.userName = action.payload;
        }
    }
})


export const usernameActions = usernameSlice.actions

export const usernameReducer = usernameSlice.reducer;