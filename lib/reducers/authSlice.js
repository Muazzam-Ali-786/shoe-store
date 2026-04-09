import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
// Deprecated: Use lib/persistedAuthSlice.js instead

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  localStorage.setItem('token', data.token);
  return data;
});

export const signup = createAsyncThunk('auth/signup', async ({ username, email, password }) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  localStorage.setItem('token', data.token);
  return data;
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');
  
  const response = await fetch('/api/verify-token', {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  const data = await response.json();
  if (!response.ok) {
    localStorage.removeItem('token');
    throw new Error(data.message);
  }
  return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
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
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;
