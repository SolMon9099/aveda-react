import { createSlice } from '@reduxjs/toolkit';

type LoadingState = {
  isLoading: boolean,
  error: Error | string | null;
  isOpen: boolean;
  selected: number
};

const initialState: LoadingState = {
  isLoading: false,
  error: null,
  isOpen: false,
  selected: 1
};

const slice = createSlice({
  name: 'auth',
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

    setSelected(state, action) {
      state.selected = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

export const { setIsOpen, setSelected } = slice.actions;