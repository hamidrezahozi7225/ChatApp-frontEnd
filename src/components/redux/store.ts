import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import chatReducer from './slice/chatSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    chatData: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
