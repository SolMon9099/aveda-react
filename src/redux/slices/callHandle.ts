import { createSlice } from '@reduxjs/toolkit';
import { newCallType, newCallTypeSchema } from 'src/@types/call';
import { _callList } from 'src/_mock/_call';
import { dispatch } from '../store';
import { post } from './api';

type CallDetailState = {
  isLoading: boolean,
  isLoadingCallToEdit: boolean,
  error: any | null,
  callToEdit: newCallType | null
}

const initialState: CallDetailState = {
  isLoading: false,
  isLoadingCallToEdit: false,
  error: null,
  callToEdit: null
};

const slice = createSlice({
  name: 'callHandle',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingCallToEdit(state) {
      state.isLoadingCallToEdit = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetCallToEdit(state) {
      state.callToEdit = null;
    },

    getCallToEditSuccess(state, action) {
      state.callToEdit = action.payload;
      state.isLoadingCallToEdit = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { resetCallToEdit } = slice.actions;

export function getCallToEdit(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingCallToEdit());
    try {
      // var response = await get(`/call/byId/${id}`)  
      var aux = JSON.parse(JSON.stringify(_callList.find((p) => p._id === id)));
      aux.tags = aux.tags.map((t: any, idx: number) => ({ ...t, value: `${idx + 1}`, label: t.title }))
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(slice.actions.getCallToEditSuccess(aux))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createOrUpdateCall(call: newCallTypeSchema) {
  return async () => {
    try {
      await post(`/call/createOrUpdate`, call)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}