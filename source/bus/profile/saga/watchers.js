// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { callUpdateNameWorker } from './workers/updateName';
import { callUpdateAvatarWorker } from './workers/updateAvatar';
import { callChangePasswordWorker } from './workers/changePassword';

function* watchUpdateName () {
    yield takeEvery(types.UPDATE_NAME_ASYNC, callUpdateNameWorker);
}
function* watchUpdateAvatar () {
    yield takeEvery(types.UPDATE_AVATAR_ASYNC, callUpdateAvatarWorker);
}
function* watchChangePassword () {
    yield takeEvery(types.UPDATE_PASSWORD_ASYNC, callChangePasswordWorker);
}

export function* watchProfile () {
    yield all([
        call(watchUpdateName),
        call(watchUpdateAvatar),
        call(watchChangePassword)
    ]);
}
