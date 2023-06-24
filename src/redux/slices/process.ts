import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { processListType } from 'src/@types/process';
import { _caseList, _processList } from 'src/_mock/_process';
import { dispatch } from '../store';
import { put } from './api';
// import { get } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingProcessList: boolean,
    error: any | null,
    processList: processListType[]
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingProcessList: false,
  error: null,
  processList: []
};

const slice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingProcessList(state){
      state.isLoadingProcessList = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProcessListSuccess(state, action){
      state.processList = action.payload;
      state.isLoadingProcessList = false;
    },
  },
});

// Reducer
export default slice.reducer;

export function getProcessList(){
  return async () => {
    dispatch(slice.actions.startLoadingProcessList());
    try {
        // var response = await get('/process/all')
        await new Promise((resolve) => setTimeout(resolve, 500));
        var auxProcess = _processList.map((p) => ({...p, lastChange: moment(p.lastChange).format('DD/MM/YYYY'), subtitle: `Processo Ativo • ${p.number}`}))
        var auxCase = _caseList.map((p) => ({...p, lastChange: moment(p.lastChange).format('DD/MM/YYYY'), subtitle: `Caso • ${p.number}`}))
        dispatch(slice.actions.getProcessListSuccess([...auxProcess, ...auxCase]))
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
  };
}

export function inactiveProcess(ids: string[]){
  return async () => {
    try {
        await put('/process/inactive', {ids})
        await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
  };
}