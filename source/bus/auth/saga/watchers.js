// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { callInitializeWorker } from './workers/initialize';
import { callLoginWorker } from './workers/login';
import { callAuthenticateWorker } from './workers/authenticate';
import { callSignupWorker } from './workers/signup';
import { callLogoutWorker } from './workers/logout';

function* watchInitialize () {
    yield takeEvery(types.INITIALIZE_ASYNC, callInitializeWorker);
}
function* watchLogin () {
    yield takeEvery(types.LOGIN_ASYNC, callLoginWorker);
}
function* watchAuthenticate () {
    yield takeEvery(types.AUTHENTICATE_ASYNC, callAuthenticateWorker);
}
function* watchSignup () {
    yield takeEvery(types.SIGNUP_ASYNC, callSignupWorker);
}
function* watchLogout () {
    yield takeEvery(types.LOGOUT_ASYNC, callLogoutWorker);
}

export function* watchAuth () {
    yield all([call(watchInitialize), call(watchLogin), call(watchAuthenticate), call(watchSignup), call(watchLogout)]);
}
