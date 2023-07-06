import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { callType, processActivity } from 'src/@types/call';
import { _callList } from 'src/_mock/_call';
import _ from 'lodash'
import { dispatch } from '../store';
import { post } from './api';

type ProcessDetailState = {
  isLoading: boolean,
  isLoadingCallDetail: boolean,
  error: any | null,
  call: callType | null,
  activities: processActivity[]
}

const initialState: ProcessDetailState = {
  isLoading: false,
  isLoadingCallDetail: false,
  error: null,
  call: null,
  activities: []
};

const slice = createSlice({
  name: 'caseDetail',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingProcessDetail(state) {
      state.isLoadingCallDetail = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setActivities(state, action) {
      state.activities = action.payload;
    },

    getCallDetailSuccess(state, action) {
      state.call = action.payload;
      state.isLoadingCallDetail = false;
    },
  },
});

// Reducer
export default slice.reducer;

export function getProcessDetail(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingProcessDetail());
    try {
      // var response = await get(`/process/byId/${id}`)      
      var aux = JSON.parse(JSON.stringify(_callList.find((p) => p._id === id)))
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(slice.actions.getCallDetailSuccess(aux))
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error));
    }
  };
}