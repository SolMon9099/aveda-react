import { createSlice } from '@reduxjs/toolkit';
import { findedUserType, newProcessImportType } from 'src/@types/process';
import { _findedUser } from 'src/_mock/_process';
import { dispatch } from '../store';
import { get, post } from './api';

type SavedState = {
  isLoading: boolean,
  isLoadingProcessList: boolean,
  error: any | null,
  findedUser: findedUserType | null
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingProcessList: false,
  error: null,
  findedUser: null
};

const slice = createSlice({
  name: 'processImport',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingProcessList(state) {
      state.isLoadingProcessList = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getEnrollmentSuccess(state, action) {
      state.findedUser = action.payload;
      state.isLoadingProcessList = false;
    },
  },
});

// Reducer
export default slice.reducer;

export function getEnrollment(oabNumebr: string, sectional: string) {
  return async () => {
    dispatch(slice.actions.startLoadingProcessList());
    try {
      var respose = await get(`/processLotImport/searchEnrollment?oabNumber=${oabNumebr}&sectional=${sectional}`)
      console.log(respose)
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(slice.actions.getEnrollmentSuccess(_findedUser))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function searchProcess(data: newProcessImportType) {
  return async () => {
    try {
      await post(`/processLotImport/searchProcess`, data)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}