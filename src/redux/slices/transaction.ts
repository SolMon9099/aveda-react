import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { transactionType } from 'src/@types/transaction';
import {_transactionList } from 'src/_mock/_transaction';
import { dispatch } from '../store';
import { put } from './api';
// import { get } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingTransactionList: boolean,
    error: any | null,
    transactionList: transactionType[],
    origin_transactionList:transactionType[],
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingTransactionList: false,
  error: null,
  transactionList: [],
  origin_transactionList:[],
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingTransactionList(state){
      state.isLoadingTransactionList = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTransactionListSuccess(state, action){
      state.transactionList = action.payload;
      state.isLoadingTransactionList = false;
    },

    getOriginTransactionListSuccess(state, action){
      state.origin_transactionList = action.payload;
    },

    dropTransaction(state, action){
      if(state.transactionList){
        var transaction_list = state.transactionList;
        if(action.payload.onlyReorder){
          transaction_list.splice(action.payload.newIndex, 0, transaction_list.splice(action.payload.oldIndex, 1)[0]);
        }else{
          var transaction = transaction_list[action.payload.oldIndex]
          transaction_list.splice(action.payload.oldIndex, 1)
          transaction.status = action.payload.newStatus
          transaction_list.splice(action.payload.newIndex, 0, transaction);
        }
        state.transactionList = transaction_list
      }
    },
  },
});

// Reducer
export default slice.reducer;

export function getTransactionList(){
  return async () => {
    dispatch(slice.actions.startLoadingTransactionList());
    try {
        // var response = await get('/process/all')
        await new Promise((resolve) => setTimeout(resolve, 500));
        var origin_transaction_list = _transactionList
        dispatch(slice.actions.getOriginTransactionListSuccess([...origin_transaction_list]))
        var transaction_list = _transactionList.map((item) => {
          return {
            ...item,
            color: 'default',
            date: (item.date) ? moment(item.date).format('DD/MM/YY') : ''
          }
        });
        dispatch(slice.actions.getTransactionListSuccess([...transaction_list,]))
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

export function dropTransaction(transactionId: string, oldStatus: string, newStatus: string, oldIndex: number ,newIndex: number, onlyReorder: boolean){
  return async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(slice.actions.dropTransaction({ transactionId, oldStatus, newStatus, oldIndex, newIndex, onlyReorder }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}