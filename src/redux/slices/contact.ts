import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { processListType } from 'src/@types/process';
import { _contactList } from 'src/_mock/_contacts';
import { dispatch } from '../store';
import { put } from './api';

type SavedState = {
  isLoading: boolean,
  isLoadingContactList: boolean,
  error: any | null,
  conactList: processListType[]
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingContactList: false,
  error: null,
  conactList: []
};

const slice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingProcessList(state) {
      state.isLoadingContactList = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProcessListSuccess(state, action) {
      state.conactList = action.payload;
      state.isLoadingContactList = false;
    },
  },
});

// Reducer
export default slice.reducer;

export function getProcessList() {
  return async () => {
    dispatch(slice.actions.startLoadingProcessList());
    try {
      // var response = await get('/process/all')
      await new Promise((resolve) => setTimeout(resolve, 500));
      var auxProcess = _contactList.map((p) => ({ ...p, lastChange: moment(p.lastChange).format('DD/MM/YYYY'), subtitle: `Processo Ativo • ${p.number}` }))
      dispatch(slice.actions.getProcessListSuccess([...auxProcess]))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function inactiveProcess(ids: string[]) {
  return async () => {
    try {
      await put('/process/inactive', { ids })
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}