import { configureStore } from '@reduxjs/toolkit';
import { dropdownReducer } from './dropdown.js';
import { blurredReducer } from './dropdown.js';
import { hamburgerReducer } from './hamburger.js';
import { messageReducer } from './succesfulmessage.js';
import { usernameReducer } from './username.js';
import { userReducer} from './user.js';
import { cartslicereducer } from './cart.js';

const store = configureStore({
  reducer: {
    dropdown: dropdownReducer, 
    hamburger: hamburgerReducer,
    blur: blurredReducer,
    successfulmsg: messageReducer,
    username: usernameReducer,
    cart:cartslicereducer,
    user:userReducer,
    // Add the other reducer(s) here

    
    // Add the dropdown reducer to the store
  },
});

export default store;