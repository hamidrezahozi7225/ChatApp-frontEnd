import { createSlice } from '@reduxjs/toolkit';

interface IInitial {
  selectChat: {
    id: string;
    image: string;
    userName: string;
  };
}

const initialState: IInitial = {
  selectChat: {
    id: '',
    image: '',
    userName: '',
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectChat: (state, action) => {
      state.selectChat.id = action.payload.id;
      state.selectChat.image = action.payload.image || null;
      state.selectChat.userName = action.payload.userName;
    },
  },
});

export const { setSelectChat } = chatSlice.actions;
export default chatSlice.reducer;
