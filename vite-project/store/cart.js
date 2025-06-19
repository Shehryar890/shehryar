import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";


export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      const user = thunkAPI.getState().user.users;
      const userId = user?.id;
      const response = await axios.get(`http://localhost:8345/cart/get/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);


const initialvalue = {
  cartitems: [],
  totalPrice: 0,
  show: false,
  successmsg: false,
  loading: false,
  error: null,
};


const cartSlice = createSlice({
  name: "cart",
  initialState: initialvalue,
  reducers: {
    getcart: (state, action) => {
      state.cartitems = action.payload;
    },
    settotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setshow: (state) => {
      state.show = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartitems = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const cartSliceActions = cartSlice.actions;
export const cartslicereducer = cartSlice.reducer;
