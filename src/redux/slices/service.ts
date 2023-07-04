import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { serviceType } from 'src/@types/service';
import {_serviceList } from 'src/_mock/_service';
import { dispatch } from '../store';
import { put } from './api';
// import { get } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingServiceList: boolean,
    error: any | null,
    serviceList: serviceType[],
    origin_serviceList:serviceType[],
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingServiceList: false,
  error: null,
  serviceList: [],
  origin_serviceList:[],
};

const slice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingServiceList(state){
      state.isLoadingServiceList = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getServiceListSuccess(state, action){
      state.serviceList = action.payload;
      state.isLoadingServiceList = false;
    },

    getOriginServiceListSuccess(state, action){
      state.origin_serviceList = action.payload;
    },

    dropServiceToService(state, action){
      if(state.serviceList){
        var service_list = state.serviceList;
        if(action.payload.onlyReorder){
          service_list.splice(action.payload.newIndex, 0, service_list.splice(action.payload.oldIndex, 1)[0]);
        }else{
          var service = service_list[action.payload.oldIndex]
          service_list.splice(action.payload.oldIndex, 1)
          service.status = action.payload.newStatus
          service_list.splice(action.payload.newIndex, 0, service);
        }
        state.serviceList = service_list
      }
    },
  },
});

// Reducer
export default slice.reducer;

export function getServiceList(){
  return async () => {
    dispatch(slice.actions.startLoadingServiceList());
    try {
        // var response = await get('/process/all')
        await new Promise((resolve) => setTimeout(resolve, 500));
        var origin_service_list = _serviceList.map((item) => {
          return {
            ...item,
            tags: item.tags.map((t: any, idx: number) => ({...t, value: `${idx+1}`, label: t.title})),
          }
        })
        dispatch(slice.actions.getOriginServiceListSuccess([...origin_service_list]))
        var service_list = _serviceList.map((item) => {
          var res = ''
          item?.responsible?.forEach((r: any, idx: any) =>{
            if(idx === 0){
              res += r.label
            }else{
              res += ', '+r.label
            }
          })
          return {
            ...item,
            responsible: res, 
            type: item.type === 'event' ? 'Evento' : 'Tarefa',
            status: item.status === 'toDo' ? 'A Fazer' : item.status === 'onDoing' ? 'Fazendo' : 'Feito',
            color: 'default',
            icon: item.type === 'event' ? 'mdi:calendar-check' : 'gg:check-o',
            tags: item.tags.map((t: any, idx: number) => ({...t, value: `${idx+1}`, label: t.title})),
            date: (item.hour && item.date) ? moment(item.date).format('DD/MM/YY') + ' • ' + item.hour : item.date ? moment(item.date).format('DD/MM/YYYY') : ''
          }
        });
        dispatch(slice.actions.getServiceListSuccess([...service_list,]))
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

export function dropService(serviceId: string, oldStatus: string, newStatus: string, oldIndex: number ,newIndex: number, onlyReorder: boolean){
  return async () => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(slice.actions.dropServiceToService({ serviceId, oldStatus, newStatus, oldIndex, newIndex, onlyReorder }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}