import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { post } from './api';

type SavedState = {
  isLoading: boolean,
  error: any | null,
}

const initialState: SavedState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'processMovimentation',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export function createMovimentation(data: any) {
  return async () => {
    try {
      await post(`/movimentation/create`, data)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}