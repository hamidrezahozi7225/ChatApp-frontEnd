import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  currentUser: {
    userId: string;
    email: string;
    imageUrl: string;
    userName: string;
  } | null;
}

const initialState: IUserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<{
        userName: string;
        email: string;
        imageUrl?: string;
        userId?: string;
      }>
    ) => {
      if (state.currentUser) {
        state.currentUser.userName = action.payload.userName;
        state.currentUser.email = action.payload.email;
        state.currentUser.imageUrl = action.payload.imageUrl || '';
        state.currentUser.userId = action.payload.userId || '';
      } else {
        state.currentUser = {
          email: action.payload.email,
          userName: action.payload.userName,
          imageUrl: action.payload.imageUrl || '',
          userId: action.payload.userId || '',
        };
      }
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
