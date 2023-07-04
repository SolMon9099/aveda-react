import { createSlice } from '@reduxjs/toolkit';
import { Like, postDetailType, relatedPostType } from 'src/@types/post';
import { fileToBase64 } from 'src/utils/toBase64';
import { dispatch } from '../store';
import { get, post } from './api';

type PostState = {
	isLoading: boolean,
	isLoadingPost: boolean,
	isLoadingRelated: boolean,
	isLoadingWhoLiked: boolean,
	error: any | null,
	selectedPost: postDetailType | null,
	relatedPosts: relatedPostType[],
	likes: Array<Like>
}

const initialState: PostState = {
	isLoading: false,
	isLoadingPost: false,
	isLoadingRelated: false,
	isLoadingWhoLiked: false,
	error: null,
	selectedPost: null,
	relatedPosts: [],
	likes: []
};

const slice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},

		startLoadingPost(state) {
			state.isLoadingPost = true;
		},

		startLoadingRelated(state) {
			state.isLoadingRelated = true;
		},

		startLoadingWhoLiked(state) {
			state.isLoadingWhoLiked = true;
		},

		hasError(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},

		getPostByIdSuccess(state, action) {
			state.selectedPost = action.payload;
			state.isLoadingPost = false
		},

		getRelatedPostsSuccess(state, action) {
			state.relatedPosts = action.payload;
			state.isLoadingRelated = false
		},

		getWhoLikedSuccess(state, action) {
			state.likes = action.payload;
			state.isLoadingWhoLiked = false
		},

	},
});

// Reducer
export default slice.reducer;

export function getPostById(userId: string, postId: string, first?: boolean, afterComment?: boolean) {
	return async () => {
		if (!afterComment) {
			if (first) {
				dispatch(slice.actions.startLoadingRelated())
				dispatch(slice.actions.startLoadingWhoLiked())
			}
			dispatch(slice.actions.startLoadingPost())
		}
		try {
			var req = '/post/byId';
			if (userId || postId) {
				req += '?'
			}
			if (userId) {
				req += `userId=${userId}&`
			}
			if (postId) {
				req += `postId=${postId}&`
			}

			var response = await get(req);
			dispatch(slice.actions.getPostByIdSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getRelatedPosts(topics: string[], excludedPostId: string) {
	return async () => {
		try {
			var req = '/post/relatedPosts';
			if (topics || excludedPostId) {
				req += '?'
			}
			if (topics) {
				topics.forEach((t) =>
					req += `topics[]=${t}&`
				)
			}
			if (excludedPostId) {
				req += `excludedPostId=${excludedPostId}&`
			}

			var response = await get(req);
			dispatch(slice.actions.getRelatedPostsSuccess(response.data))
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function getWhoLiked(postId: string) {
	return async () => {
		try {
			const response = await get(`/post/getWhoLiked/${postId}`);
			dispatch(slice.actions.getWhoLikedSuccess(response.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function likePost(userId: string, postId: string) {
	return async () => {
		try {
			await post(`/post/like`, { userId, postId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function savePost(userId: string, postId: string) {
	return async () => {
		try {
			await post(`/post/savePost`, { userId, postId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function deletePost(postId: string) {
	return async () => {
		try {
			await post(`/post/deletePost`, { postId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function pinPost(postId: string) {
	return async () => {
		try {
			await post(`/post/pinPost`, { postId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function commentPost(userId: string, postId: string, body: string, images: File[], links: string[], parentComment?: string) {
	return async () => {
		try {
			var attachments: any = [];

			const map = images.map(async (img) => {
				var base64 = await fileToBase64(img)
				var res = await post('/attachment/create', { image: base64, attachmentType: 'image', userId })
				attachments.push(res.data)
			})

			await Promise.all(map)

			const map2 = links.map(async (link) => {
				var res = await post('/attachment/create', { url: link, attachmentType: 'link', userId })
				attachments.push(res.data)
			})

			await Promise.all(map2)

			await post(`/post/comment/create`, { author: userId, post: postId, body, parentComment, attachments });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function likeComment(userId: string, commentId: string) {
	return async () => {
		try {
			await post(`/comment/like`, { userId, commentId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function deleteComment(commentId: string) {
	return async () => {
		try {
			await post(`/comment/delete`, { commentId });
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}