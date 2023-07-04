import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { newCaseType, processActivity, processActivitySchema, processServiceSchema } from 'src/@types/process';
import { _caseCompleteList } from 'src/_mock/_process';
import _ from 'lodash'
import { dispatch } from '../store';
import { post } from './api';

type CaseDetailState = {
  isLoading: boolean,
  isLoadingCaseDetail: boolean,
  error: any | null,
  process: newCaseType | null,
  activities: processActivity[]
}

const initialState: CaseDetailState = {
  isLoading: false,
  isLoadingCaseDetail: false,
  error: null,
  process: null,
  activities: []
};

const slice = createSlice({
  name: 'caseDetail',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingCaseDetail(state) {
      state.isLoadingCaseDetail = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setActivities(state, action) {
      state.activities = action.payload;
    },

    getCaseDetailSuccess(state, action) {
      state.process = action.payload;
      state.isLoadingCaseDetail = false;
    },
  },
});

// Reducer
export default slice.reducer;

export function getCaseDetail(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingCaseDetail());
    try {
      // var response = await get(`/process/byId/${id}`) 
      var aux = JSON.parse(JSON.stringify(_caseCompleteList.find((p) => p._id === id)))

      var activities = JSON.parse(JSON.stringify(aux.activities))
      activities = activities.map((act: any) => ({
        ...act,
        date: moment(new Date(act.date)).format('YYYY-MM-DD'),
        tags: act.tags.map((t: any, idx: number) => ({ ...t, value: `${idx + 1}`, label: t.title })),
      }))
      dispatch(slice.actions.setActivities(activities))

      aux?.activities.forEach((act: any, idx: any) => {
        var res = ''
        act?.responsible?.forEach((r: any, idx: any) => {
          if (idx === 0) {
            res += r.label
          } else {
            res += ', ' + r.label
          }
        })
        //@ts-ignore
        aux.activities[idx] = {
          ...act,
          responsible: res,
          type: act.type === 'event' ? 'Evento' : 'Tarefa',
          status: act.status === 'toDo' ? 'A Fazer' : act.status === 'onDoing' ? 'Fazendo' : 'Concluído',
          color: 'default',
          icon: act.type === 'event' ? 'mdi:calendar-check' : 'gg:check-o',
          tags: act.tags.map((t: any, idx: number) => ({ ...t, value: `${idx + 1}`, label: t.title })),
          date: (act.hour && act.date) ? moment(act.date).format('DD/MM/YY') + ' • ' + act.hour : act.date ? moment(act.date).format('DD/MM/YYYY') : ''
        }
      })

      aux.services.sort((a: any, b: any) => {
        if (moment(a.date).isAfter(b.date)) {
          return -1;
        }
        if (moment(a.date).isBefore(b.date)) {
          return 1;
        }
        return 0;
      });

      aux.services = aux.services.map((s: any) => (
        {
          ...s,
          type: s.type === 'email' ? 'Email' : s.type === 'calling' ? 'Ligação' : 'Atendimento',
        }
      ))

      aux.serviceGrouped = _.groupBy(aux.services, m => moment(m.date).format('DD/MM/YYYY'))

      aux.documents = aux.documents.map((d: any) => ({ ...d, createdAt: moment(d.createdAt).format('DD/MM/YYYY') }))
      // aux.activities = aux.activities.map((act: any) => ({...act, tags: act.tags.map((t: any, idx: number) => ({...t, value: `${idx+1}`, label: t.title}))}))
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(slice.actions.getCaseDetailSuccess(aux))
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createService(service: processServiceSchema) {
  return async () => {
    try {
      await post('/service/create', service)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error));
    }
  }
}

export function createOrUpdateActivity(activity: processActivitySchema) {
  return async () => {
    try {
      await post('/activity/createOrUpdate', activity)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error));
    }
  }
}