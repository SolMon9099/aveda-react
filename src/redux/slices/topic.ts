import { createSlice } from '@reduxjs/toolkit';
import { feedPostType, paginationType } from 'src/@types/feed';
import { selectedTopicType, topicType } from 'src/@types/topics';
import { dispatch } from '../store';
import { get } from './api';

type TopicState = {
  isLoading: boolean,
  isLoadingTopics: boolean,
  isLoadingTopicsPosts: boolean,
  error: any | null,
  topics: topicType[],
  fixedTopics: topicType[],
  topicPagination: paginationType | null,
  topicPosts: feedPostType[],
  topicPostsPagination: paginationType | null,
  selectedTopic: selectedTopicType | null,
}

const initialState: TopicState = {
  isLoading: false,
  isLoadingTopics: false,
  isLoadingTopicsPosts: false,
  error: null,
  topics: [],
  fixedTopics: [],
  topicPagination: null,
  topicPosts: [],
  topicPostsPagination: null,
  selectedTopic: null
};

const slice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingTopics(state) {
      state.isLoadingTopics = true;
    },

    startLoadingTopicsPosts(state) {
      state.isLoadingTopicsPosts = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    resetError(state) {
      state.error = null;
    },

    getTopicsSuccess(state, action) {
      state.topics = [...state.topics, ...action.payload.topics];
      state.topicPagination = action.payload.pagination;
      state.isLoadingTopics = false;
    },

    getTopicsFixedSuccess(state, action) {
      state.fixedTopics = action.payload;
      state.isLoading = false;
    },

    getTopicPostsSuccess(state, action) {
      state.topicPosts = [...state.topicPosts, ...action.payload.posts];
      state.topicPostsPagination = action.payload.pagination;
      state.isLoadingTopicsPosts = false;
    },

    getTopicByIdSuccess(state, action) {
      state.selectedTopic = action.payload;
      state.isLoading = false;
    },

    resetTopics(state) {
      state.topics = []
      state.fixedTopics = []
      state.topicPagination = null
    },

    resetTopicPosts(state) {
      state.topicPosts = []
      state.topicPostsPagination = null
    },

    resetTopic(state) {
      state.selectedTopic = null
    }

  },
});

// Reducer
export default slice.reducer;

export const { resetTopicPosts, resetError, resetTopics, resetTopic } = slice.actions;

export function getTopics(userId: string, limit: number, nextCursor?: string) {
  return async () => {
    dispatch(slice.actions.startLoadingTopics());
    try {
      var req = '/topic/many';
      if (userId || limit || nextCursor) {
        req += '?'
      }
      if (userId) {
        req += `userId=${userId}&`
      }
      if (limit) {
        req += `limit=${limit}&`
      }
      if (nextCursor) {
        req += `nextCursor=${nextCursor}&`
      }
      var response = await get(req);
      dispatch(slice.actions.getTopicsSuccess({ topics: response.data.data, pagination: response.data.paging }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTopicsFixed(userId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      var req = '/topic/fixed';
      if (userId) {
        req += '?'
      }
      if (userId) {
        req += `userId=${userId}&`
      }
      var response = await get(req);
      dispatch(slice.actions.getTopicsFixedSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTopicPosts(userId: string, limit: number, topicId: string, nextCursor?: string) {
  return async () => {
    dispatch(slice.actions.startLoadingTopicsPosts());
    try {
      var req = '/post/many';
      if (userId || limit || nextCursor || topicId) {
        req += '?'
      }
      if (userId) {
        req += `userId=${userId}&`
      }
      if (limit) {
        req += `limit=${limit}&`
      }
      if (nextCursor) {
        req += `nextCursor=${nextCursor}&`
      }
      if (topicId) {
        req += `topic=${topicId}&`
      }
      var response = await get(req);
      dispatch(slice.actions.getTopicPostsSuccess({ posts: response.data.data, pagination: response.data.paging }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTopicById(topicId: string, userId?: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      let response
      if (userId) {
        response = await get(`/topic/byId/${topicId}?userId=${userId}`);
      } else {
        response = await get(`/topic/byId/${topicId}`);
      }
      dispatch(slice.actions.getTopicByIdSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}