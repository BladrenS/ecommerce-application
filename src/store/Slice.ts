import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const Slice = createSlice({
  name: 'State',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setValue } = Slice.actions;
export default Slice.reducer;
