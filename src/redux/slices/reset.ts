import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import "firebase/firestore";
import { post } from './api';

type ResetState = {
	isLoading: boolean,
	isLoadingOptions: boolean,
	error: any | null,
	success: any,
	openModal: any
}

const initialState: ResetState = {
	isLoading: false,
	isLoadingOptions: false,
	error: null,
	success: null,
	openModal: false,
};

const slice = createSlice({
	name: 'reset',
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},

		startLoadingOptions(state) {
			state.isLoadingOptions = true;
		},

		hasError(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		resetSuccess(state, action) {
			state.success = action.payload;
		},
		openModalSuccess(state, action) {
			state.openModal = action.payload;
		}

	},
});

// Reducer
export default slice.reducer;

export function resetPassword(data: any, hashUser: any) {
	return async () => {
		try {
			let response = await post('/user/resetPass', { password: data, hashUser: hashUser });
			dispatch(slice.actions.resetSuccess(response))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function openResetModal(option: any) {
	return async () => {
		try {
			dispatch(slice.actions.openModalSuccess(option))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getResetLink(data: any) {
	return async () => {
		try {
			let response = await post('/user/resetLink', { email: data });
			dispatch(slice.actions.openModalSuccess(true))
			dispatch(slice.actions.resetSuccess(response))
			return response
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}