import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { proceduralType } from 'src/@types/transaction';
import {_proceduralList } from 'src/_mock/_transaction';
import { dispatch } from '../store';
import { put } from './api';
// import { get } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingProceduralList: boolean,
    error: any | null,
    proceduralList: proceduralType[],
    origin_proceduralList:proceduralType[],
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingProceduralList: false,
  error: null,
  proceduralList: [],
  origin_proceduralList:[],
};

const slice = createSlice({
  name: 'procedural',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingProceduralList(state){
      state.isLoadingProceduralList = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProceduralListSuccess(state, action){
      state.proceduralList = action.payload;
      state.isLoadingProceduralList = false;
    },

    getOriginProceduralListSuccess(state, action){
      state.origin_proceduralList = action.payload;
    },

    dropProcedural(state, action){
      if(state.proceduralList){
        var procedural_list = state.proceduralList;
        if(action.payload.onlyReorder){
          procedural_list.splice(action.payload.newIndex, 0, procedural_list.splice(action.payload.oldIndex, 1)[0]);
        }else{
          var procedural = procedural_list[action.payload.oldIndex]
          procedural_list.splice(action.payload.oldIndex, 1)
          procedural.status = action.payload.newStatus
          procedural_list.splice(action.payload.newIndex, 0, procedural);
        }
        state.proceduralList = procedural_list
      }
    },
  },
});

// Reducer
export default slice.reducer;

export function getProceduralList(){
  return async () => {
    dispatch(slice.actions.startLoadingProceduralList());
    try {
        // var response = await get('/process/all')
        await new Promise((resolve) => setTimeout(resolve, 500));
        var origin_procedural_list = _proceduralList
        dispatch(slice.actions.getOriginProceduralListSuccess([...origin_procedural_list]))
        var procedural_list = _proceduralList.map((item) => {
          return {
            ...item,
            color: 'default',
            date: (item.date) ? moment(item.date).format('DD/MM/YY') : ''
          }
        });
        dispatch(slice.actions.getProceduralListSuccess([...procedural_list,]))
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

export function dropProcedural(proceduralId: string, oldStatus: string, newStatus: string, oldIndex: number ,newIndex: number, onlyReorder: boolean){
  return async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(slice.actions.dropProcedural({ proceduralId, oldStatus, newStatus, oldIndex, newIndex, onlyReorder }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}