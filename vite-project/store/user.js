import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';



   const fetchUser  = createAsyncThunk("/user/fetchUser",   async (  ...rejectWithValue)=>{

     try{
console.log(document.cookie);
        document.cookie.split(';').forEach(c => console.log("Cookie:", c)); // Debugging: Log all cookies

        const response = await axios.get('http://localhost:8345/token/checking', {
            withCredentials: true,  
            headers: {
                Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}` // Get token from cookies
            }
        });
                

       
        if(response.status === 401){

            return rejectWithValue("user already logged in");

            
        }
        else{
            console.log(response.data)
            return response.data
            
        }
    }
    catch(error){
        console.log(error)
        rejectWithValue(error.message)
    }





   })


   const userSlice = createSlice({
    name :"user", 
    initialState:{
        users:null,
        error:null,
        loading:false,
  
        islogout:false,
      

    },
    reducers:{
        logout:(state )=>{

            state.islogout= true

        }

    },
   

    extraReducers:  (builders)=>{

         builders.addCase(fetchUser.pending , (state,action)=>{
            state.loading = true;
            state.error = null;
            state.users = null;

         }),
         builders.addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = null;
            state.users = action.payload;
         }),
         builders.addCase(fetchUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.users = null;
         })

        }


   })


   export const userActions = userSlice.actions;
   export const userReducer = userSlice.reducer;
   export const fetchUserAction = fetchUser;