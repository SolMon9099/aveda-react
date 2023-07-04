import { createSlice } from '@reduxjs/toolkit';
import { communityDetailsType, communityType } from 'src/@types/community';
import { feedPostType, feedTopUserType, paginationType } from 'src/@types/feed';
import { topicType } from 'src/@types/topics';
import { dispatch } from '../store';
import { get, post } from './api';

type FeedState = {
	isLoading: boolean,
	isLoadingDiscover: boolean,
	isLoadingCommunity: boolean,
	isLoadingCommunityPosts: boolean,
	isLoadingSearchPosts: boolean,
	isLoadingTopics: boolean,
	error: any | null,
	topics: topicType[],
	fixedTopics: topicType[],
	topicPagination: paginationType | null,
	allCommunities: communityType[],
	selectedCommunity: communityDetailsType | null,
	communityPosts: feedPostType[],
	communityPagination: paginationType | null,
	searchPosts: feedPostType[],
	searchPagination: paginationType | null,
	members: feedTopUserType[],
	awaitingApproval: feedTopUserType[],
	admins: Array<any>
}

const initialState: FeedState = {
	isLoading: false,
	isLoadingDiscover: false,
	isLoadingCommunity: false,
	isLoadingCommunityPosts: false,
	isLoadingSearchPosts: false,
	isLoadingTopics: false,
	error: null,
	allCommunities: [],
	selectedCommunity: null,
	communityPosts: [],
	communityPagination: null,
	searchPosts: [],
	searchPagination: null,
	members: [],
	awaitingApproval: [],
	topicPagination: null,
	topics: [],
	fixedTopics: [],
	admins: []
};

const slice = createSlice({
	name: 'community',
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},

		startLoadingDiscover(state) {
			state.isLoadingDiscover = true;
		},

		startLoadingCommunity(state) {
			state.isLoadingCommunity = true;
		},

		startLoadingCommunityPosts(state) {
			state.isLoadingCommunityPosts = true;
		},

		startLoadingSearchPosts(state) {
			state.isLoadingSearchPosts = true;
		},

		startLoadingTopics(state) {
			state.isLoadingTopics = true;
		},

		// HAS ERROR
		hasError(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},

		getDiscoverSuccess(state, action) {
			state.allCommunities = action.payload;
			state.isLoadingDiscover = false
		},

		getCommunityByIdSuccess(state, action) {
			state.selectedCommunity = action.payload;
			state.isLoadingCommunity = false
		},

		getCommunityPostsSuccess(state, action) {
			state.communityPosts = [...state.communityPosts, ...action.payload.posts];
			state.communityPagination = action.payload.pagination;
			state.isLoadingCommunityPosts = false;
		},

		getCommunityMembersSuccess(state, action) {
			state.members = action.payload;
			state.isLoading = false;
		},

		getCommunityAwaitingApprovalSuccess(state, action) {
			state.awaitingApproval = action.payload;
			state.isLoading = false;
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

		getTopicsSuccess(state, action) {
			state.topics = [...state.topics, ...action.payload.topics];
			state.topicPagination = action.payload.pagination;
			state.isLoadingTopics = false;
		},

		getTopicsFixedSuccess(state, action) {
			state.fixedTopics = action.payload;
			state.isLoading = false;
		},

		resetCommunityPosts(state) {
			state.communityPosts = []
			state.communityPagination = null
		},

		resetSearchPosts(state) {
			state.searchPosts = []
			state.searchPagination = null
		},

		resetCommunity(state) {
			state.selectedCommunity = null
		},

		resetTopics(state) {
			state.topics = []
			state.fixedTopics = []
			state.topicPagination = null
		},

		getAdminsSuccess(state, action) {
			state.admins = action.payload;
			state.isLoading = false;
		}

	},
});

// Reducer
export default slice.reducer;

export const { resetCommunityPosts, resetSearchPosts, resetCommunity, resetTopics } = slice.actions;

export function getDiscover(userId: string) {
	return async () => {
		dispatch(slice.actions.startLoadingDiscover());
		try {
			var req = '/community/all'
			if (userId) {
				req += `?userId=${userId}`
			}
			var response = await get(req);
			dispatch(slice.actions.getDiscoverSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function joinCommunity(userId: string, communityId: string) {
	return async () => {
		try {
			await post(`/community/join`, { userId, communityId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function acceptCommunity(userId: string, communityId: string) {
	return async () => {
		try {
			await post(`/community/acceptRequest`, { userId, communityId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function requestCommunity(userId: string, communityId: string) {
	return async () => {
		try {
			await post(`/community/request`, { userId, communityId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function leaveCommunity(userId: string, communityId: string) {
	return async () => {
		try {
			await post(`/community/leave`, { userId, communityId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function declineRequestCommunity(userId: string, communityId: string) {
	return async () => {
		try {
			await post(`/community/declineRequest`, { userId, communityId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getCommunityById(communityId: string, userId: any) {
	return async () => {
		dispatch(slice.actions.startLoadingCommunity());
		try {
			var response = await get(`/community/details?communityId=${communityId}&userId=${userId}`)
			dispatch(slice.actions.getCommunityByIdSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getCommunityMembers(communityId: string) {
	return async () => {
		dispatch(slice.actions.startLoading());
		try {
			var response = await get(`/community/members?communityId=${communityId}`)
			dispatch(slice.actions.getCommunityMembersSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getCommunityAwaitingApproval(communityId: string) {
	return async () => {
		dispatch(slice.actions.startLoading());
		try {
			var response = await get(`/community/awaitingApproval?communityId=${communityId}`)
			dispatch(slice.actions.getCommunityAwaitingApprovalSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getCommunityPosts(userId: string, limit: number, communityId: string, nextCursor?: string,) {
	return async () => {
		dispatch(slice.actions.startLoadingCommunityPosts());
		try {
			var req = `/post/many`;
			if (userId || limit || nextCursor || communityId) {
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
			if (communityId) {
				req += `communityId=${communityId}&`
			}
			var response = await get(req)
			dispatch(slice.actions.getCommunityPostsSuccess({ posts: response.data.data, pagination: response.data.paging }))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getSearchPosts(userId: string, limit: number, textSearch: string, communityId: string, nextCursor?: string, more?: boolean) {
	return async () => {
		dispatch(slice.actions.startLoadingSearchPosts());
		try {
			var req = `/post/many`;
			if (userId || limit || nextCursor || communityId) {
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
			if (communityId) {
				req += `communityId=${communityId}&`
			}
			var response = await get(req)
			dispatch(slice.actions.getSearchPostsSuccess({ posts: response.data.data, pagination: response.data.paging, more }))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getTopics(userId: string, limit: number, communityId: string, nextCursor?: string) {
	return async () => {
		dispatch(slice.actions.startLoadingTopics());
		try {
			var req = '/topic/many';
			if (userId || limit || nextCursor || communityId) {
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
			if (communityId) {
				req += `communityId=${communityId}&`
			}
			var response = await get(req);
			dispatch(slice.actions.getTopicsSuccess({ topics: response.data.data, pagination: response.data.paging }))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getTopicsFixed(userId: string, communityId: string) {
	return async () => {
		try {
			var req = '/topic/fixed';
			if (userId || communityId) {
				req += '?'
			}
			// if(userId){
			//     req += `userId=${userId}&`
			// }
			if (communityId) {
				req += `communityId=${communityId}&`
			}
			var response = await get(req);
			dispatch(slice.actions.getTopicsFixedSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getAdmins(communityId: string) {
	return async () => {
		try {
			dispatch(slice.actions.startLoading());
			var response = await get(`/community/admins?communityId=${communityId}`)
			dispatch(slice.actions.getAdminsSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}