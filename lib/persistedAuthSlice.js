import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import safeStorage from './safeStorage';
import { clearCart, setCart } from './reducers/cartSlice';
import { clearWishlist, setWishlist } from './reducers/wishlistSlice';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { dispatch }) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  safeStorage.setItem('token', data.token);
  
  // Sync User Data
  if (data.user) {
    if (data.user.cart) dispatch(setCart(data.user.cart));
    if (data.user.wishlist) dispatch(setWishlist(data.user.wishlist));
  }
  
  return data;
});

export const signup = createAsyncThunk('auth/signup', async ({ username, email, password }, { dispatch }) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  safeStorage.setItem('token', data.token);
  
  // Initial empty sync
  dispatch(clearCart());
  dispatch(clearWishlist());
  
  return data;
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async (_, { dispatch }) => {
  const token = safeStorage.getItem('token');
  if (!token) throw new Error('No token');
  
  const response = await fetch('/api/verify-token', {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const data = await response.json();
  if (!response.ok) {
    safeStorage.removeItem('token');
    throw new Error(data.message);
  }
  
  // Sync User Data
  if (data.user) {
    if (data.user.cart) dispatch(setCart(data.user.cart));
    if (data.user.wishlist) dispatch(setWishlist(data.user.wishlist));
  }
  
  return data;
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  safeStorage.removeItem('token');
  dispatch(clearCart());
  dispatch(clearWishlist());
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
      })
      .addMatcher(isAnyOf(login.rejected, signup.rejected, verifyToken.rejected), (state) => {
        state.user = null;
        state.token = null;
        state.status = 'failed';
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'status'], // persist all
};

export const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export default authSlice.reducer;

