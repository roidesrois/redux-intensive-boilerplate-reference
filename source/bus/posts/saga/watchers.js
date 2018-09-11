// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { fetchPosts } from './workers/fetchPosts';
import { createPost } from './workers/createPost';
import { removePost } from './workers/removePost';
import { likePost } from './workers/likePost';
import { unlikePost } from './workers/unlikePost';

function* watchFetchPosts () {
    yield takeEvery(types.FETCH_POSTS_ASYNC, fetchPosts);
}
function* watchCreatePost () {
    yield takeEvery(types.CREATE_POST_ASYNC, createPost);
}
function* watchRemovePost () {
    yield takeEvery(types.REMOVE_POST_ASYNC, removePost);
}
function* watchLikePost () {
    yield takeEvery(types.LIKE_POST_ASYNC, likePost);
}
function* watchUnlikePost () {
    yield takeEvery(types.UNLIKE_POST_ASYNC, unlikePost);
}

export function* watchPosts () {
    yield all([
        call(watchFetchPosts),
        call(watchCreatePost),
        call(watchRemovePost),
        call(watchLikePost),
        call(watchUnlikePost)
    ]);
}
