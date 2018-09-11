// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { authActions } from '../../../auth/actions';

export function* callInitializeWorker () {
    const remember = yield apply(localStorage, localStorage.getItem, ['remember']);
    const token = yield apply(localStorage, localStorage.getItem, ['token']);

    if (remember && token) {
        yield put(authActions.authenticateAsync());
    } else {
        yield put(authActions.initialize());
    }
}
