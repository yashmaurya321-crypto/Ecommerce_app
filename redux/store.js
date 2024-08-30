// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; 
import wishlistReducer from './wishListSlice'; 
import themeReducer from './themeSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
  },
});

export default store;

