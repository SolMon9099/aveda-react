import { createSlice } from '@reduxjs/toolkit';
import { processDocumentSchema } from 'src/@types/process';
import { dispatch } from '../store';
import { post, put } from './api';

type SavedState = {
  isLoading: boolean,
  error: any | null,
}

const initialState: SavedState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'processDocument',
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

export function createDocument(data: processDocumentSchema) {
  return async () => {
    try {
      await post('/document/create', data)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function inactiveDocument(ids: string[]) {
  return async () => {
    try {
      await put('/document/inactive', { ids })
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}