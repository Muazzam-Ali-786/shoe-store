import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shoesData } from '../shoesData';

export const fetchShoes = createAsyncThunk('shoes/fetchShoes', async () => {
  // Simulate API
  return shoesData;
});

const shoesSlice = createSlice({
  name: 'shoes',
  initialState: {
    data: [],
    status: 'idle',
  },
  reducers: {
    filterShoes: (state, action) => {
      const { category, gender } = action.payload;
      state.data = shoesData.filter(shoe => 
        (!category || shoe.category === category) &&
        (!gender || shoe.gender === gender)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShoes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      });
  },
});

export const { filterShoes } = shoesSlice.actions;
export default shoesSlice.reducer;

