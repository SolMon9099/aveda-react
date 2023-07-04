import { createSlice } from '@reduxjs/toolkit';
import { feedPostType, paginationType } from 'src/@types/feed';
import { dispatch } from '../store';
import { get } from './api';

type SavedState = {
  isLoading: boolean,
  isLoadingSavedPosts: boolean,
  error: any | null,
  savedPostsPagination: paginationType | null,
  savedPosts: feedPostType[],
}

const initialState: SavedState = {
  isLoading: false,
  isLoadingSavedPosts: false,
  error: null,
  savedPosts: [],
  savedPostsPagination: null,
};

const slice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingSavedPosts(state) {
      state.isLoadingSavedPosts = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getSavedPostsSuccess(state, action) {
      state.savedPosts = [...state.savedPosts, ...action.payload.posts];
      state.savedPostsPagination = action.payload.pagination;
      state.isLoadingSavedPosts = false;
    },

    resetSavedPosts(state) {
      state.savedPosts = [];
      state.savedPostsPagination = null;
    },

    removePost(state, action) {
      state.savedPosts = state.savedPosts.filter((post) => action.payload !== post._id);
    },
  },
});

// Reducer
export default slice.reducer;

export const { resetSavedPosts, removePost } = slice.actions;

export function getSavedPosts(userId: string, limit: number, nextCursor?: string) {
  return async () => {
    dispatch(slice.actions.startLoadingSavedPosts());
    try {
      var req = '/post/saved';
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
      dispatch(slice.actions.getSavedPostsSuccess({ posts: response.data.data, pagination: response.data.paging }))
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}