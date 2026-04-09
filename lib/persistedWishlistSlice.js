import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import wishlistReducer from './reducers/wishlistSlice';

const persistConfig = {
  key: 'wishlist',
  storage,
};

export const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer);

