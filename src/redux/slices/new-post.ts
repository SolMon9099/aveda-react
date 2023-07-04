import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment'
import { newPostType } from 'src/@types/post';
import { fileToBase64 } from 'src/utils/toBase64';
import { dispatch } from '../store';
import { get, post } from './api';

type PostState = {
	isLoading: boolean,
	isLoadingOptions: boolean,
	error: any | null,
	localOptions: { value: string, label: string }[],
	topicOptions: { value: string, label: string, fromCommunity: boolean }[],
	user: any
}

const initialState: PostState = {
	isLoading: false,
	isLoadingOptions: false,
	error: null,
	localOptions: [],
	topicOptions: [],
	user: null,
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

		getUserSuccess(state, action) {
			state.user = action.payload;
			state.isLoadingOptions = false;
		}
	},
});

// Reducer
export default slice.reducer;

export function getYoutubeId(url: string): string {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return (match && match[2].length === 11) ? match[2] : '';
}

export function getOptions(userId: string) {
	return async () => {
		dispatch(slice.actions.startLoadingOptions());
		try {
			var resCommunity = await get(`/community/all?userId=${userId}`);
			var resTopic = await get(`/topic/many?userId=${userId}&limit=1000`);
			var resTopicFixed = await get(`/topic/fixed?userId=${userId}`);
			var auxCommunities: { value: string, label: string }[] = [{ value: 'forum', label: 'Fórum Adeva' }];
			var auxTopics: { value: string, label: string, fromCommunity: boolean }[] = [];
			resCommunity.data.forEach((c: any) => {
				if (c.isMember) {
					auxCommunities.push({ value: c._id, label: c.name })
				}
			})
			resTopic.data.data.forEach((t: any) => {
				auxTopics.push({ value: t._id, label: t.name, fromCommunity: t.fromCommunity })
			})
			resTopicFixed.data.forEach((t: any) => {
				auxTopics.push({ value: t._id, label: t.name, fromCommunity: t.fromCommunity })
			})
			auxTopics.sort(function (a, b) {
				if (a.label > b.label) {
					return -1;
				}
				if (b.label > a.label) {
					return 1;
				}
				return 0;
			});
			auxCommunities.sort(function (a, b) {
				if (a.label > b.label) {
					return -1;
				}
				if (b.label > a.label) {
					return 1;
				}
				return 0;
			});
			dispatch(slice.actions.getOptionsSuccess({ local: auxCommunities, topic: auxTopics }));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getApiKey(userId: string) {
	return async () => {
		dispatch(slice.actions.startLoadingOptions());
		try {
			var res = await get(`/user/userData`);
			var user = { ...res.data }
			dispatch(slice.actions.getUserSuccess(user));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function create(userId: string, newPost: newPostType, images: File[], links: string[], currentTab: number, thumb: any, isLiveNow?: any, date?: any) {
	return async () => {
		dispatch(slice.actions.startLoadingOptions());
		try {
			if (currentTab === 1) { // Live publica
				var auxPost: any = {}
				auxPost.author = userId
				auxPost.title = newPost.title
				auxPost.body = newPost.body
				auxPost.local = []
				auxPost.topics = []
				auxPost.attachments = []

				newPost.local.forEach((local) => {
					if (local.value === 'forum') {
						auxPost.local.push({ localType: 'forum' })
					} else {
						auxPost.local.push({ localType: 'community', community: local.value })
					}
				})

				newPost.topics.forEach((topic) => {
					auxPost.topics.push(topic.value)
				})

				const map = images.map(async (img) => {
					var base64 = await fileToBase64(img)
					var res = await post('/attachment/create', { image: base64, attachmentType: 'image', userId })
					auxPost.attachments.push(res.data)
				})

				await Promise.all(map)

				const map2 = links.map(async (link) => {
					var res = await post('/attachment/create', { url: link, attachmentType: 'link', userId })
					auxPost.attachments.push(res.data)
				})

				await Promise.all(map2)

				await post('/post/create', auxPost)
			} else { // Live privada
				var auxPostLive: any = {}
				auxPostLive.author = userId
				auxPostLive.title = newPost.title
				auxPostLive.body = newPost.body
				auxPostLive.isLive = true
				auxPostLive.local = []
				auxPostLive.topics = []
				auxPostLive.scheduleHour = newPost.scheduleHour ? newPost.scheduleHour : moment(new Date()).format('LT')
				auxPostLive.isLiveNow = isLiveNow
				auxPostLive.date = date
				auxPostLive.isPanda = newPost.isPanda
				auxPostLive.pandaApiKey = newPost.pandaApiKey
				auxPostLive.endHour = moment(date).add(newPost.duration, 'minutes').format('LT')
				auxPostLive.duration = newPost.duration
				auxPostLive.link = newPost.isPanda ? '' : `https://youtube.com/embed/${getYoutubeId(newPost.link)}`;

				const thumbGen = thumb.map(async (tbm: any) => {
					var thumbBase64 = await fileToBase64(tbm)
					var thumbRes = await post('/attachment/create', { image: thumbBase64, attachmentType: 'thumbnail', userId })
					auxPostLive.thumbnail = thumbRes.data.url
				})
				await Promise.all(thumbGen)

				newPost.local.forEach((local) => {
					if (local.value === 'forum') {
						auxPostLive.local.push({ localType: 'forum' })
					} else {
						auxPostLive.local.push({ localType: 'community', community: local.value })
					}
				})

				auxPostLive.topics.push('640b42a609a353d4956ebd75')
				newPost.topics.forEach((topic) => {
					if (topic.value !== '640b42a609a353d4956ebd75') {
						auxPostLive.topics.push(topic.value)
					}
				})

				const map = images.map(async (img) => {
					var base64 = await fileToBase64(img)
					var res = await post('/attachment/create', { image: base64, attachmentType: 'image', userId })
					auxPostLive.attachments.push(res.data)
				})

				await Promise.all(map)

				const map2 = links.map(async (link) => {
					var res = await post('/attachment/create', { url: link, attachmentType: 'link', userId })
					auxPostLive.attachments.push(res.data)
				})

				await Promise.all(map2)
				await post('/post/create', auxPostLive)
			}
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}