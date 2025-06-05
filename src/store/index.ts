import { configureStore } from '@reduxjs/toolkit';

import { Reducer } from './Slice';

export const store = configureStore({
  reducer: {
    version: Reducer,
  },
});

// Типы для использования с useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
