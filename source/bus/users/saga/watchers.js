// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Instruments
import { types } from '../types';
import { callFetchUsersWorker } from './workers/fetchUsers';

function* watchFetchUsers () {
    yield takeEvery(types.FETCH_USERS_ASYNC, callFetchUsersWorker);
}

export function* watchUsers () {
    yield all([call(watchFetchUsers)]);
}
