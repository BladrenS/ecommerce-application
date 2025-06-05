import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SomeState {
  value: number;
}

const initialState: SomeState = {
  value: 1,
};

export const Slice = createSlice({
  name: 'version',
  initialState,
  reducers: {
    setSomeState: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    incrementSomeState: (state) => {
      state.value += 1;
    },
  },
});

export const { setSomeState, incrementSomeState } = Slice.actions;

export const Reducer = Slice.reducer;
