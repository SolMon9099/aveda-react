import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { db } from '../../config'
import "firebase/firestore";
import { post } from './api';

type LiveState = {
	isLoading: boolean,
	isLoadingOptions: boolean,
	error: any | null,
	localOptions: { value: string, label: string }[],
	topicOptions: { value: string, label: string, fromCommunity: boolean }[],
	messages: any
}

const initialState: LiveState = {
	isLoading: false,
	isLoadingOptions: false,
	error: null,
	localOptions: [],
	topicOptions: [],
	messages: []
};

const slice = createSlice({
	name: 'new-post',
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

		getOptionsSuccess(state, action) {
			state.localOptions = action.payload.local;
			state.topicOptions = action.payload.topic;
			state.isLoadingOptions = false;
		},

		getMessagesSlice(state, action) {
			state.messages = action.payload
		}

	},
});

// Reducer
export default slice.reducer;

export function sendMessage(isAdmin: any, liveId: any, author: any, message: any, createdAt: any) {
	return async () => {
		try {
			var data = {
				message: message,
				author: author.name ? author.name : 'User',
				authorImage: author.image ? author.image : 'none',
				isAdmin: isAdmin,
				createdAt: createdAt
			}
			await db.collection('lives').doc(liveId).collection('msgs').add(data)
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getMessages(liveId: any) {
	return async () => {
		try {
			var messages = await db.collection("lives").doc(liveId).collection('msgs').get()
			let msgs: any = []
			messages.forEach((doc) => {
				msgs.push(doc.data())
			})
			// var snap = await db.collection("lives").doc(liveId).collection('msgs').onSnapshot((querySnapshot) =>{
			//     querySnapshot.forEach((doc) =>{
			//         console.log("ON SNAP : ",doc.data())
			//     })
			// }) 
			dispatch(slice.actions.getMessagesSlice(msgs))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function finishLive(liveId: any) {
	return async () => {
		try {
			await post(`/post/finish`, { liveId: liveId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}