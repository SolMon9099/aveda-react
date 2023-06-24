import { createSlice } from '@reduxjs/toolkit';
import { feedPostType, paginationType } from 'src/@types/feed';
import { api } from 'src/config';
// import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

type MyPostsState = {
    isLoading: boolean,
    isLoadingMyPosts: boolean,
    isLoadingCommentedPosts: boolean,
    error: any | null,
    myPosts: feedPostType[],
    commentedPosts: feedPostType[],
    myPostsPagination: paginationType | null,
    commentedPostsPagination: paginationType | null,
}

const initialState: MyPostsState = {
  isLoading: false,
  isLoadingMyPosts: false,
  isLoadingCommentedPosts: false,
  error: null,
  myPosts: [],
  commentedPosts: [],
  myPostsPagination: null,
  commentedPostsPagination: null,
};

const slice = createSlice({
  name: 'myPosts',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    startLoadingMyPosts(state) {
      state.isLoadingMyPosts = true;
    },

    startLoadingCommentedPosts(state){
      state.isLoadingCommentedPosts = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getMyPostsSuccess(state,action){
      state.myPosts = [...state.myPosts, ...action.payload.posts];
      state.myPostsPagination = action.payload.pagination;
      state.isLoadingMyPosts = false;
    },

    getSearchPostsSuccess(state,action){
      state.commentedPosts = [...state.commentedPosts, ...action.payload.posts];
      state.commentedPostsPagination = action.payload.pagination;
      state.isLoadingCommentedPosts = false;
    },

    resetCommentedPosts(state){
      state.commentedPosts = []
      state.commentedPostsPagination = null
    },

    resetMyPosts(state){
      state.myPosts = []
      state.myPostsPagination = null
    }
  },
});

// Reducer
export default slice.reducer;

export const { resetCommentedPosts, resetMyPosts } = slice.actions;

export function getMyPosts(userId: string, limit: number, nextCursor?: string) {
    return async () => {
            dispatch(slice.actions.startLoadingMyPosts());
        try {
            var req = `/post/many`;
            if(userId || limit || nextCursor){
              req += '?'
            }
            if(userId){
              req += `userId=${userId}&author=${userId}&`
            }
            if(limit){
              req += `limit=${limit}&`
            }
            if(nextCursor){
              req += `nextCursor=${nextCursor}&`
            }
            var response = await api.get(req)
            dispatch(slice.actions.getMyPostsSuccess({posts: response.data.data, pagination: response.data.paging}))
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getCommentedPosts(userId: string, limit: number, nextCursor?: string) {
  return async () => {
          dispatch(slice.actions.startLoadingCommentedPosts());
      try {
          var req = `/post/byCommentAuthor`;
          if(userId || limit || nextCursor){
            req += '?'
          }
          if(userId){
            req += `userId=${userId}&`
          }
          if(limit){
            req += `limit=${limit}&`
          }
          if(nextCursor){
            req += `nextCursor=${nextCursor}&`
          }
          var response = await api.get(req)
          dispatch(slice.actions.getSearchPostsSuccess({posts: response.data.data, pagination: response.data.paging}))
      } catch (error) {
          dispatch(slice.actions.hasError(error));
      }
  };
}