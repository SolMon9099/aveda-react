import { createSlice } from '@reduxjs/toolkit';
import { _caseCompleteList } from 'src/_mock/_process';
import { dispatch } from '../store';
import { post } from './api';
import { newContactSchema } from 'src/@types/contact';
import { _contactListFull } from 'src/_mock/_contacts';

type ContactsHandleState = {
  isLoading: boolean,
  isLoadingContactToEdit: boolean,
  error: any | null,
  contactToEdit: newContactSchema | null
}

const initialState: ContactsHandleState = {
  isLoading: false,
  isLoadingContactToEdit: false,
  error: null,
  contactToEdit: null
};

const slice = createSlice({
  name: 'contactsHandle',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingContactToEdit(state) {
      state.isLoadingContactToEdit = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetContactToEdit(state) {
      state.contactToEdit = null
    },

    getContactToEditSuccess(state, action) {
      state.contactToEdit = action.payload;
      state.isLoadingContactToEdit = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const { resetContactToEdit } = slice.actions;

export function getContactToEdit(id: string) {
  return async () => {
    dispatch(slice.actions.startLoadingContactToEdit());
    try {
      // var response = await get(`/contact/byId/${id}`)  
      var contactToEdit = JSON.parse(JSON.stringify(_contactListFull.find((p) => p._id === id)));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(slice.actions.getContactToEditSuccess(contactToEdit))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createOrUpdateContact(process: newContactSchema) {
  return async () => {
    try {
      await post(`/contact/createOrUpdate`, process)
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}