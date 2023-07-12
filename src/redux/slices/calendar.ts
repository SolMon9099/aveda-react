import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { get, post } from './api';
import { taskSchema } from 'src/@types/task';
import { _calendarList } from 'src/_mock/_calendar';
import moment from 'moment';
import palette from 'src/theme/palette';

type CallDetailState = {
  isLoading: boolean,
  isLoadingCalendar: boolean,
  error: any | null,
  calendarEvents: any | null,
}

const initialState: CallDetailState = {
  isLoading: false,
  isLoadingCalendar: false,
  error: null,
  calendarEvents: null
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingCalendar(state) {
      state.isLoadingCalendar = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCalendarSuccess(state, action){
        state.calendarEvents = action.payload;
        state.isLoadingCalendar = false;
    }

  },
});

// Reducer
export default slice.reducer;

export function getCalendar(responsibles: {value: string, label: string, color: string}[]) {
  return async () => {
    dispatch(slice.actions.startLoadingCalendar());
    try {
      // var response = await get(`/calendar/events`)  
    //   var aux = JSON.parse(JSON.stringify(_callList.find((p) => p._id === id)));
    //   aux.tags = aux.tags.map((t: any, idx: number) => ({ ...t, value: `${idx + 1}`, label: t.title }))
    //   await new Promise((resolve) => setTimeout(resolve, 500));
      await new Promise((resolve) => setTimeout(resolve, 500));
      let calendarEvents = _calendarList.filter((t, i) => t.type === 'event').map((t) =>{
        var startDate = moment(t.date).format().split('T')[0] + 'T' + t.hour + ':00-03:00'
        if(responsibles.length > 0){
          return{
            id: t._id,
            title: t.name,
            date: startDate,
            //@ts-ignore
            textColor: palette.light[responsibles.filter((r) => t.responsible.find((t) => r.value === t.value))[0].color].main,
            //@ts-ignore
            borderColor: palette.light[responsibles.filter((r) => t.responsible.find((t) => r.value === t.value))[0].color].dark, 
            extendedProps:{
              ...t
            }
          }
        }else{
          return{
            id: t._id,
            title: t.name,
            date: startDate,
            textColor:'#454F5B',
            backgroundColor: '#F4F6F8',
            borderColor: '#C4CDD5', 
            extendedProps:{
              ...t
            }
          }
        }
      })
      console.log(calendarEvents)
      dispatch(slice.actions.getCalendarSuccess(calendarEvents))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addEvent(event: taskSchema) {
  return async () => {
    try {
      // var response = await post(`/calendar/addEvent`, event)  
      await new Promise((resolve) => setTimeout(resolve, 500));
      // dispatch(slice.actions.getCalendarSuccess([]))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function editEvent(event: taskSchema) {
  return async () => {
    try {
      // var response = await post(`/calendar/editEvent`, event)  
      await new Promise((resolve) => setTimeout(resolve, 500));
      // dispatch(slice.actions.getCalendarSuccess([]))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteEvent(id: string) {
  return async () => {
    try {
      // var response = await post(`/calendar/deleteEvent`, {id})  
      await new Promise((resolve) => setTimeout(resolve, 500));
      // dispatch(slice.actions.getCalendarSuccess([]))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}