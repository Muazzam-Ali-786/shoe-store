import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import shoesReducer from './reducers/shoesSlice';
import { persistedCartReducer } from './reducers/cartSlice';
import { persistedWishlistReducer } from './reducers/wishlistSlice';
import { persistedAuthReducer } from './persistedAuthSlice';

const appReducer = combineReducers({
  shoes: shoesReducer,
  cart: persistedCartReducer,
  wishlist: persistedWishlistReducer,
  auth: persistedAuthReducer,
});

// Root reducer that can globally reset the state
const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled' || action.type === 'auth/resetAll') {
    // Reset all slices except shoes (static data)
    state = {
      shoes: state.shoes,
      auth: undefined,
      cart: undefined,
      wishlist: undefined
    };
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);
