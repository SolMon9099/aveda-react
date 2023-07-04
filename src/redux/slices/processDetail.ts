import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { newProcessType, processActivity, processActivitySchema, processServiceSchema } from 'src/@types/process';
import { _processCompleteList } from 'src/_mock/_process';
import _ from 'lodash'
import { dispatch } from '../store';
import { post } from './api';

type ProcessDetailState = {
  isLoading: boolean,
  isLoadingProcessDetail: boolean,
  error: any | null,
  process: newProcessType | null,
  activities: processActivity[]
}

const initialState: ProcessDetailState = {
  isLoading: false,
  isLoadingProcessDetail: false,
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

    startLoadingProcessDetail(state) {
      state.isLoadingProcessDetail = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setActivities(state, action) {
      state.activities = action.payload;
    },

    getProcessDetailSuccess(state, action) {
      state.process = action.payload;
      state.isLoadingProcessDetail = false;
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
      var aux = JSON.parse(JSON.stringify(_processCompleteList.find((p) => p._id === id)))

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
          tags: act.tags.map((t: any, idx: number) => ({ ...t, value: `${idx + 1}`, label: t.title })),
          icon: act.type === 'event' ? 'mdi:calendar-check' : 'gg:check-o',
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
      aux.services = aux.services.map((s: any) => ({ ...s, type: s.type === 'email' ? 'Email' : s.type === 'calling' ? 'Ligação' : 'Atendimento' }))
      aux.serviceGrouped = _.groupBy(aux.services, m => moment(m.date).format('DD/MM/YYYY'))
      aux.movimentationsPendindgToday = 0;
      aux.movimentationsPendindgAll = 0;
      aux.movimentations.sort((a: any, b: any) => {
        if (moment(a.date).isAfter(b.date)) {
          return -1;
        }
        if (moment(a.date).isBefore(b.date)) {
          return 1;
        }
        return 0;
      });
      aux.movimentations = aux.movimentations.map((m: any) => {
        if (m.status === 'pending') {
          aux.movimentationsPendindgAll++;
          if (moment(m.date).calendar().split(' ')[0] === 'Hoje') {
            aux.movimentationsPendindgToday++;
          }
        }
        return {
          ...m,
          type: m.type === 'document' ? 'Documento' : m.type === 'publication' ? 'Publicação' : 'Movimentação',
          status: m.status === 'discarded' ? 'Descartado' : m.status === 'pending' ? 'Pendente' : 'Revisado',
        }
      }
      )
      aux.movimentationGrouped = _.groupBy(aux.movimentations, m => moment(m.date).format('DD/MM/YYYY'))

      aux.documents = aux.documents.map((d: any) => ({ ...d, createdAt: moment(d.createdAt).format('DD/MM/YYYY') }))

      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(slice.actions.getProcessDetailSuccess(aux))
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