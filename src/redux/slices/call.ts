import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { callType } from 'src/@types/call';
import {_callList } from 'src/_mock/_call';
import { dispatch } from '../store';
import { put } from './api';
// import { get } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingCallList: boolean,
    error: any | null,
    callList: callType[],
    origin_callList:callType[],
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingCallList: false,
  error: null,
  callList: [],
  origin_callList:[],
};

const slice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingCallList(state){
      state.isLoadingCallList = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCallListSuccess(state, action){
      state.callList = action.payload;
      state.isLoadingCallList = false;
    },

    getOriginCallListSuccess(state, action){
      state.origin_callList = action.payload;
    },

    dropCallToCall(state, action){
      if(state.callList){
        var call_list = state.callList;
        if(action.payload.onlyReorder){
          call_list.splice(action.payload.newIndex, 0, call_list.splice(action.payload.oldIndex, 1)[0]);
        }else{
          var call = call_list[action.payload.oldIndex]
          call_list.splice(action.payload.oldIndex, 1)
          call.status = action.payload.newStatus
          call_list.splice(action.payload.newIndex, 0, call);
        }
        state.callList = call_list
      }
    },
  },
});

// Reducer
export default slice.reducer;

export function getCallList(){
  return async () => {
    dispatch(slice.actions.startLoadingCallList());
    try {
        // var response = await get('/process/all')
        await new Promise((resolve) => setTimeout(resolve, 500));
        var origin_call_list = _callList.map((item) => {
          return {
            ...item,
            tags: item.tags.map((t: any, idx: number) => ({...t, value: `${idx+1}`, label: t.title})),
          }
        })
        dispatch(slice.actions.getOriginCallListSuccess([...origin_call_list]))
        var call_list = _callList.map((item) => {
          return {
            ...item,
            color: 'default',
            tags: item.tags.map((t: any, idx: number) => ({...t, value: `${idx+1}`, label: t.title})),
            date: (item.date) ? moment(item.date).format('DD/MM/YY') : ''
          }
        });
        dispatch(slice.actions.getCallListSuccess([...call_list,]))
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

export function dropCall(callId: string, oldStatus: string, newStatus: string, oldIndex: number ,newIndex: number, onlyReorder: boolean){
  return async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(slice.actions.dropCallToCall({ callId, oldStatus, newStatus, oldIndex, newIndex, onlyReorder }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}