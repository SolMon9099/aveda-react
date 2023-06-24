import { createSlice } from '@reduxjs/toolkit';
import { processImportListDetailType, processImportListType } from 'src/@types/process';
import { _processImportList, _processImportListDetail } from 'src/_mock/_process';
// utils
// import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import moment from 'moment';
import { get, post } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingProcessImportList: boolean,
    isLoadingProcessImportDetail: boolean,
    error: any | null,
    processImportList: processImportListType[],
    processImportDetail: processImportListDetailType | null
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingProcessImportList: false,
  isLoadingProcessImportDetail: false,
  error: null,
  processImportList: [],
  processImportDetail: null
};

const slice = createSlice({
  name: 'processImportList',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingProcessList(state){
      state.isLoadingProcessImportList = true;
    },

    startLoadingProcessDetail(state){
      state.isLoadingProcessImportDetail = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProcessSuccess(state, action){
      state.processImportList = action.payload;
      state.isLoadingProcessImportList = false;
    },

    getProcessLotDetailSuccess(state, action){
      state.processImportDetail = action.payload;
      state.isLoadingProcessImportDetail = false;
    }
  },
});

// Reducer
export default slice.reducer;

export function getProcessLotList(){
  return async () => {
    dispatch(slice.actions.startLoadingProcessList());
    try {
        var response = await get('/processLotImport/all')
        console.log(response)
        var aux: any[] = []
        _processImportList.forEach((p) =>{
          aux.push({
            ...p, 
            color: p.status === 'searching' ? 'warning' : 'success', 
            status: p.status === 'searching' ? 'Pesquisando' : 'Concluído', 
            processTotal: p.status === 'searching' ? 'Calculando...' : p.processTotal,
            searchDate: moment(p.searchDate).format('DD/MM/YYYY'),
            lawyerDesc: p.oabNumber + ' / ' + p.sectional
          })
        })
        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch(slice.actions.getProcessSuccess(aux))
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProcessLotDetail(id: string){
  return async () => {
    dispatch(slice.actions.startLoadingProcessDetail());
    try {
        var response = await get(`/processLotImport/getById/${id}`)
        console.log(response)
        var aux = _processImportListDetail.find((p) => p._id === id)
        if(aux){
          aux.searchDate = moment(aux?.searchDate).format('DD/MM/YYYY') as any
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch(slice.actions.getProcessLotDetailSuccess(aux))
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
  };
}

export function importProcessFromLot(data: any){
  return async () => {
    try {
        await post(`/processLotImport/import`, data)
        await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
        dispatch(slice.actions.hasError(error));
    }
  };
}