import { createSlice } from '@reduxjs/toolkit';
import { isString } from 'lodash';
import { fileToBase64 } from 'src/utils/toBase64';
import { dispatch } from '../store';
import { post } from './api';

type LoadingState = {
  isLoading: boolean,
  error: Error | string | null;
  isOpen: boolean;
};

const initialState: LoadingState = {
  isLoading: false,
  error: null,
  isOpen: false,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export const { setIsOpen } = slice.actions;

export function updateUser(user: any) {
  return async () => {
    try {
      if (user.photo && !isString(user.photo)) {
        const image64 = await fileToBase64(user.photo)
        const imageRes = await post('/fileTransfer/sendFile', { base64: image64, path: user.photo.path })
        user.photo = imageRes.data.url
      }
      post(`/user/update`, user);
      dispatch(slice.actions.setIsOpen(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}