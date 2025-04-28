import { configureStore } from '@reduxjs/toolkit';
import Reducer from './Slice';

const store = configureStore({
  reducer: {
    State: Reducer,
  },
});

export default store;