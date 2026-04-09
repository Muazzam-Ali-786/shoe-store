import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import shoesReducer from './reducers/shoesSlice';
import cartReducer from './reducers/cartSlice';
import { persistedWishlistReducer } from './persistedWishlistSlice';
import { persistedAuthReducer } from './persistedAuthSlice';

export const store = configureStore({
  reducer: {
    shoes: shoesReducer,
    cart: cartReducer,
    wishlist: persistedWishlistReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

