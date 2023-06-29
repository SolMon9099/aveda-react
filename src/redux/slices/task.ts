import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { taskType } from 'src/@types/task';
import {_taskList } from 'src/_mock/_task';
import { dispatch } from '../store';
import { put } from './api';
// import { get } from './api';

// ----------------------------------------------------------------------

type SavedState = {
    isLoading: boolean,
    isLoadingTaskList: boolean,
    error: any | null,
    taskList: taskType[],
    origin_taskList:taskType[],
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingTaskList: false,
  error: null,
  taskList: [],
  origin_taskList:[],
};

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingTaskList(state){
      state.isLoadingTaskList = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTaskListSuccess(state, action){
      state.taskList = action.payload;
      state.isLoadingTaskList = false;
    },

    getOriginTaskListSuccess(state, action){
      state.origin_taskList = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export function getTaskList(){
  return async () => {
    dispatch(slice.actions.startLoadingTaskList());
    try {
        // var response = await get('/process/all')
        await new Promise((resolve) => setTimeout(resolve, 500));
        var origin_task_list = _taskList.map((item) => {
          return {
            ...item,
            tags: item.tags.map((t: any, idx: number) => ({...t, value: `${idx+1}`, label: t.title})),
          }
        })
        dispatch(slice.actions.getOriginTaskListSuccess([...origin_task_list]))
        var task_list = _taskList.map((item) => {
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
        dispatch(slice.actions.getTaskListSuccess([...task_list,]))
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