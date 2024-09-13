// redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [
           ],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
     
      const existingItem = state.items.find(i => i.name === item.name);
      if (!existingItem) {
        state.items.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
