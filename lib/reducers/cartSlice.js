import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(i => i.id === id);
      const qtyToAdd = quantity || 1;
      
      if (existingItem) {
        existingItem.quantity += qtyToAdd;
      } else {
        state.items.push({ ...action.payload, quantity: qtyToAdd });
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCart: (state, action) => {
      state.items = action.payload || [];
    },
  },
});

const persistConfig = {
  key: 'cart',
  storage,
};

export const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

