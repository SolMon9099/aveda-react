import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment'
import { newPostType } from 'src/@types/post';
import { api } from 'src/config';
import { fileToBase64 } from 'src/utils/toBase64';
// utils
// import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

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
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        startLoadingOptions(state) {
            state.isLoadingOptions = true;
        },

        // HAS ERROR
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

export function getYoutubeId(url: string) : string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
}

export function getOptions(userId: string) {
    return async () => {
        dispatch(slice.actions.startLoadingOptions());
        try {
            var resCommunity = await api.get(`/community/all?userId=${userId}`);
            var resTopic = await api.get(`/topic/many?userId=${userId}&limit=1000`);
            var resTopicFixed = await api.get(`/topic/fixed?userId=${userId}`);
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
            var res = await api.get(`/user/userData`);
            var user = { ...res.data }
            dispatch(slice.actions.getUserSuccess(user));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function create(userId: string, post: newPostType, images: File[], links: string[], currentTab: number, thumb: any, isLiveNow?: any, date?: any) {
    return async () => {
        dispatch(slice.actions.startLoadingOptions());
        try {
            if (currentTab === 1) { // Live publica
                var auxPost: any = {}
                auxPost.author = userId
                auxPost.title = post.title
                auxPost.body = post.body
                auxPost.local = []
                auxPost.topics = []
                auxPost.attachments = []

                post.local.forEach((local) => {
                    if (local.value === 'forum') {
                        auxPost.local.push({ localType: 'forum' })
                    } else {
                        auxPost.local.push({ localType: 'community', community: local.value })
                    }
                })

                post.topics.forEach((topic) => {
                    auxPost.topics.push(topic.value)
                })

                const map = images.map(async (img) => {
                    var base64 = await fileToBase64(img)
                    var res = await api.post('/attachment/create', { image: base64, attachmentType: 'image', userId })
                    auxPost.attachments.push(res.data)
                })

                await Promise.all(map)

                const map2 = links.map(async (link) => {
                    var res = await api.post('/attachment/create', { url: link, attachmentType: 'link', userId })
                    auxPost.attachments.push(res.data)
                })

                await Promise.all(map2)

                await api.post('/post/create', auxPost)
            } else { // Live privada
                var auxPostLive: any = {}
                auxPostLive.author = userId
                auxPostLive.title = post.title
                auxPostLive.body = post.body
                auxPostLive.isLive = true
                auxPostLive.local = []
                auxPostLive.topics = []
                auxPostLive.scheduleHour = post.scheduleHour ? post.scheduleHour : moment(new Date()).format('LT')
                auxPostLive.isLiveNow = isLiveNow
                auxPostLive.date = date
                auxPostLive.isPanda = post.isPanda
                auxPostLive.pandaApiKey = post.pandaApiKey
                auxPostLive.endHour = moment(date).add(post.duration, 'minutes').format('LT')
                auxPostLive.duration = post.duration
                auxPostLive.link = post.isPanda ? '' : `https://youtube.com/embed/${getYoutubeId(post.link)}`;
                
                const thumbGen = thumb.map(async (tbm: any) => {
                    var thumbBase64 = await fileToBase64(tbm)
                    var thumbRes = await api.post('/attachment/create', { image: thumbBase64, attachmentType: 'thumbnail', userId })
                    auxPostLive.thumbnail = thumbRes.data.url
                })
                await Promise.all(thumbGen)

                post.local.forEach((local) => {
                    if (local.value === 'forum') {
                        auxPostLive.local.push({ localType: 'forum' })
                    } else {
                        auxPostLive.local.push({ localType: 'community', community: local.value })
                    }
                })

                auxPostLive.topics.push('640b42a609a353d4956ebd75')
                post.topics.forEach((topic) => {
                    if (topic.value !== '640b42a609a353d4956ebd75') {
                        auxPostLive.topics.push(topic.value)
                    }
                })

                const map = images.map(async (img) => {
                    var base64 = await fileToBase64(img)
                    var res = await api.post('/attachment/create', { image: base64, attachmentType: 'image', userId })
                    auxPostLive.attachments.push(res.data)
                })

                await Promise.all(map)

                const map2 = links.map(async (link) => {
                    var res = await api.post('/attachment/create', { url: link, attachmentType: 'link', userId })
                    auxPostLive.attachments.push(res.data)
                })

                await Promise.all(map2)

                await api.post('/post/create', auxPostLive)
            }
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}