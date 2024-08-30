// redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [
        {
            id : 9,
            brand: 'APPLE',
            name: 'Apple AirPods Pro',
            image: 'https://rukminim2.flixcart.com/image/128/128/xif0q/headphone/e/a/f/-original-imagtc44nk4b3hfg.jpeg?q=70&crop=false',
            discountedPrice: '24,999',
            originalPrice: '29,900',
            discount: 16,
            assuredBadge: true,
            freeDelivery: true,
            
          },
    ],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
     
      const existingItem = state.items.find(i => i.id === item.id);
      if (!existingItem) {
        state.items.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
