import { createSlice } from '@reduxjs/toolkit';
import { newProcessType, newProcessTypeSchema } from 'src/@types/process';
import { _processCompleteList } from 'src/_mock/_process';
import { dispatch } from '../store';
import { post } from './api';

type ProcessDetailState = {
  isLoading: boolean,
  isLoadingProcessToEdit: boolean,
  error: any | null,
  processToEdit: newProcessType | null
}

const initialState: ProcessDetailState = {
  isLoading: false,
  isLoadingProcessToEdit: false,
  error: null,
  processToEdit: null
};

const slice = createSlice({
  name: 'processHandle',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingProcessToEdit(state) {
      state.isLoadingProcessToEdit = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetProcessToEdit(state) {
      state.processToEdit = null;
    },

    getProcessToEditSuccess(state, action) {
      state.processToEdit = action.payload;
      state.isLoadingProcessToEdit = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { resetProcessToEdit } = slice.actions;

export function getProcessToEdit(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingProcessToEdit());
    try {
      // var response = await get(`/process/byId/${id}`)  
      var aux = JSON.parse(JSON.stringify(_processCompleteList.find((p) => p._id === id)));
      aux.tags = aux.tags.map((t: any, idx: number) => ({ ...t, value: `${idx + 1}`, label: t.title }))
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(slice.actions.getProcessToEditSuccess(aux))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createOrUpdateProcess(process: newProcessTypeSchema) {
  return async () => {
    try {
      await post(`/process/createOrUpdate`, process)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}