import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (!existingItem) {
        state.items.push({ ...item });
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlist: (state, action) => {
      state.items = action.payload || [];
    },
  },
});

const persistConfig = {
  key: 'wishlist',
  storage,
};

export const persistedWishlistReducer = persistReducer(persistConfig, wishlistSlice.reducer);

export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

