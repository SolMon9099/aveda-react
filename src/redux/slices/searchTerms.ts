import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { searchTermType } from 'src/@types/searchTerms';
import {_searchTermList } from 'src/_mock/_searchTerms';
import { dispatch } from '../store';
import { put } from './api';
// import { get } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingSearchTermList: boolean,
    error: any | null,
    searchTermList: searchTermType[],
    origin_searchTermList:searchTermType[],
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingSearchTermList: false,
  error: null,
  searchTermList: [],
  origin_searchTermList:[],
};

const slice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingSearchTermList(state){
      state.isLoadingSearchTermList = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getSearchTermListSuccess(state, action){
      state.searchTermList = action.payload;
      state.isLoadingSearchTermList = false;
    },

    getOriginSearchTermListSuccess(state, action){
      state.origin_searchTermList = action.payload;
    },

    dropSearchTerm(state, action){
      if(state.searchTermList){
        var searchterm_list = state.searchTermList;
        if(action.payload.onlyReorder){
          searchterm_list.splice(action.payload.newIndex, 0, searchterm_list.splice(action.payload.oldIndex, 1)[0]);
        }else{
          var searchterm = searchterm_list[action.payload.oldIndex]
          searchterm_list.splice(action.payload.oldIndex, 1)
          searchterm.status = action.payload.newStatus
          searchterm_list.splice(action.payload.newIndex, 0, searchterm);
        }
        state.searchTermList = searchterm_list
      }
    },
  },
});

// Reducer
export default slice.reducer;

export function getSearchTermList(){
  return async () => {
    dispatch(slice.actions.startLoadingSearchTermList());
    try {
        // var response = await get('/process/all')
        await new Promise((resolve) => setTimeout(resolve, 500));
        var origin_searchterm_list = _searchTermList
        console.log("search terms === ", _searchTermList)
        dispatch(slice.actions.getOriginSearchTermListSuccess([...origin_searchterm_list]))
        var searchterm_list = _searchTermList.map((item) => {
          return {
            ...item,
            color: 'default',
            // date: (item.date) ? moment(item.date).format('DD/MM/YY') : ''
          }
        });
        dispatch(slice.actions.getSearchTermListSuccess([...searchterm_list,]))
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

export function dropSearchTerm(searchtermId: string, oldStatus: string, newStatus: string, oldIndex: number ,newIndex: number, onlyReorder: boolean){
  return async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(slice.actions.dropSearchTerm({ searchtermId, oldStatus, newStatus, oldIndex, newIndex, onlyReorder }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}