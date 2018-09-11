// Types
import { types } from './types';

export const postsActions = {
    fillPosts: (posts) => ({
        type:    types.FILL_POSTS,
        payload: posts,
    }),
    createPost: (post) => ({
        type:    types.CREATE_POST,
        payload: post,
    }),
    removePost: (postId) => ({
        type:    types.REMOVE_POST,
        payload: postId,
    }),
    likePost: (likedPostData) => ({
        type:    types.LIKE_POST,
        payload: likedPostData,
    }),
    unlikePost: (unlikedPostData) => ({
        type:    types.UNLIKE_POST,
        payload: unlikedPostData,
    }),
    clearPosts: () => ({
        type: types.CLEAR_POSTS,
    }),

    // Async
    fetchPostsAsync: () => ({
        type: types.FETCH_POSTS_ASYNC,
    }),
    createPostAsync: (comment) => ({
        type:    types.CREATE_POST_ASYNC,
        payload: comment,
    }),
    removePostAsync: (postId) => ({
        type:    types.REMOVE_POST_ASYNC,
        payload: postId,
    }),
    likePostAsync: (postId) => ({
        type:    types.LIKE_POST_ASYNC,
        payload: postId,
    }),
    unlikePostAsync: (postId) => ({
        type:    types.UNLIKE_POST_ASYNC,
        payload: postId,
    }),
};
