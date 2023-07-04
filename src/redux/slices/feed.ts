import { createSlice } from '@reduxjs/toolkit';
import { feedPostType, feedTopTopicType, feedTopUserType, paginationType } from 'src/@types/feed';
import { dispatch } from '../store';
import { get } from './api';

type FeedState = {
  isLoading: boolean,
  isLoadingFeedPosts: boolean,
  isLoadingSearchPosts: boolean,
  isLoadingTopics: boolean,
  error: any | null,
  feedPosts: feedPostType[],
  searchPosts: feedPostType[],
  feedPagination: paginationType | null,
  searchPagination: paginationType | null,
  topUsers: {
    mostLikedUsers: feedTopUserType[],
    currentUser: feedTopUserType[]
  } | null,
  topTopics: feedTopTopicType[]
}

const initialState: FeedState = {
  isLoading: false,
  isLoadingFeedPosts: false,
  isLoadingSearchPosts: false,
  isLoadingTopics: false,
  error: null,
  feedPosts: [],
  searchPosts: [],
  feedPagination: null,
  searchPagination: null,
  topUsers: null,
  topTopics: []
};

const slice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingFeedPosts(state) {
      state.isLoadingFeedPosts = true;
    },

    startLoadingSearchPosts(state) {
      state.isLoadingSearchPosts = true;
    },

    startLoadingTopics(state) {
      state.isLoadingTopics = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getFeedPostsSuccess(state, action) {
      state.feedPosts = [...state.feedPosts, ...action.payload.posts];
      state.feedPagination = action.payload.pagination;
      state.isLoadingFeedPosts = false;
    },

    getSearchPostsSuccess(state, action) {
      if (action.payload.more) {
        state.searchPosts = [...state.searchPosts, ...action.payload.posts];
      } else {
        state.searchPosts = action.payload.posts
      }
      state.searchPagination = action.payload.pagination;
      state.isLoadingSearchPosts = false;
    },

    getFeedTopicsSuccess(state, action) {
      state.topTopics = action.payload;
      state.isLoadingTopics = false;
    },

    getFeedTopUsersSuccess(state, action) {
      state.topUsers = action.payload;
      state.isLoading = false;
    },

    resetSearchPosts(state) {
      state.searchPosts = []
      state.searchPagination = null
    },

    resetFeedPosts(state) {
      state.feedPosts = []
      state.feedPagination = null
    }


  },
});

// Reducer
export default slice.reducer;

export const { resetSearchPosts, resetFeedPosts } = slice.actions;

export function getFeedPosts(userId: string, limit: number, nextCursor?: string) {
  return async () => {
    dispatch(slice.actions.startLoadingFeedPosts());
    try {
      var req = `/feed/posts`;
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
      var response = await get(req)
      dispatch(slice.actions.getFeedPostsSuccess({ posts: response.data.data, pagination: response.data.paging }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSearchPosts(userId: string, limit: number, textSearch: string, nextCursor?: string, more?: boolean) {
  return async () => {
    dispatch(slice.actions.startLoadingSearchPosts());
    try {
      var req = `/feed/posts`;
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
      if (textSearch) {
        req += `textSearch=${textSearch}&`
      }
      var response = await get(req)
      dispatch(slice.actions.getSearchPostsSuccess({ posts: response.data.data, pagination: response.data.paging, more }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getFeedTopics() {
  return async () => {
    dispatch(slice.actions.startLoadingTopics());
    try {
      var response = await get('/topic/mainTopics');
      dispatch(slice.actions.getFeedTopicsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getFeedTopUsers(userId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      var response = await get(`/user/mostLikedUsers?currentUser=${userId}`);
      dispatch(slice.actions.getFeedTopUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}