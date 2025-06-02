import { configureStore } from '@reduxjs/toolkit';

import { versionReducer } from './versionSlice';

export const store = configureStore({
  reducer: {
    version: versionReducer,
  },
});

// Типы для использования с useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
