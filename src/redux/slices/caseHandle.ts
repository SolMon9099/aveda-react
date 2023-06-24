import { createSlice } from '@reduxjs/toolkit';
import { newCaseType, newCaseTypeSchema } from 'src/@types/process';
import { _caseCompleteList } from 'src/_mock/_process';
// utils
// import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { post } from './api';

// ----------------------------------------------------------------------

type CaseHandleState = {
    isLoading: boolean,
    isLoadingCaseToEdit: boolean,
    error: any | null,
    caseToEdit: newCaseType | null
}

const initialState: CaseHandleState = {
  isLoading: false,
  isLoadingCaseToEdit: false,
  error: null,
  caseToEdit: null
};

const slice = createSlice({
  name: 'caseHandle',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingCaseToEdit(state){
      state.isLoadingCaseToEdit = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetCaseToEdit(state){
      state.caseToEdit = null
    },

    getCaseToEditSuccess(state, action){
      state.caseToEdit = action.payload;
      state.isLoadingCaseToEdit = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { resetCaseToEdit } = slice.actions;

export function getCaseToEdit(id: string){
  return async () => {
    dispatch(slice.actions.startLoadingCaseToEdit());
    try {
        // var response = await get(`/process/byId/${id}`)  
        var aux = JSON.parse(JSON.stringify(_caseCompleteList.find((p) => p._id === id )));
        aux.tags = aux.tags.map((t: any, idx: number) => ({...t, value: `${idx+1}`, label: t.title}))
        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch(slice.actions.getCaseToEditSuccess(aux))
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
  };
}

export function createOrUpdateCase(process: newCaseTypeSchema){
  return async () => {
    try {
        await post(`/process/createOrUpdate`, process)  
        await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
  };
}