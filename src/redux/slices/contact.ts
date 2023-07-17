import { createSlice } from '@reduxjs/toolkit';
import { _contactList, _contactListFull } from 'src/_mock/_contacts';
import { dispatch } from '../store';
import { put } from './api';
import { contactListType, newContactSchema } from 'src/@types/contact';

type SavedState = {
  isLoading: boolean,
  isLoadingContactList: boolean,
  isLoadingContactById: boolean,
  error: any | null,
  contactList: contactListType[]
  contact: newContactSchema | null;
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingContactList: false,
  isLoadingContactById: false,
  error: null,
  contactList: [],
  contact: null,
};

const slice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingContactList(state) {
      state.isLoadingContactList = true;
    },

    startLoadingContactById(state) {
      state.isLoadingContactById = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getContactListSuccess(state, action) {
      state.contactList = action.payload;
      state.isLoadingContactList = false;
    },

    getContactByIdSuccess(state, action){
      state.contact = action.payload;
      state.isLoadingContactById = false;
    }
  },
});

// Reducer
export default slice.reducer;

export function getContactById(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingContactById());
    try {
      // var response = await get('/contact/all')
      await new Promise((resolve) => setTimeout(resolve, 500));
      const contact = _contactListFull.find((c) => c._id === id)
      dispatch(slice.actions.getContactByIdSuccess(contact))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getContactList() {
  return async () => {
    dispatch(slice.actions.startLoadingContactList());
    try {
      // var response = await get('/contact/all')
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(slice.actions.getContactListSuccess(_contactList))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function inactiveContact(ids: string[]) {
  return async () => {
    try {
      await put('/contact/inactive', { ids })
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}