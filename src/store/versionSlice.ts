import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface VersionState {
  value: number;
}

const initialState: VersionState = {
  value: 1,
};

export const versionSlice = createSlice({
  name: 'version',
  initialState,
  reducers: {
    setVersion: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    incrementVersion: (state) => {
      state.value += 1;
    },
  },
});

export const { setVersion, incrementVersion } = versionSlice.actions;

export const versionReducer = versionSlice.reducer;
