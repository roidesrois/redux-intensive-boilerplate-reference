// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../../auth/actions';
import { profileActions } from '../../../profile/actions';

export function* callLoginWorker ({ payload: credentials }) {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield apply(api, api.auth.login, [credentials]);
        const { data: profile, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        if (credentials.remember) {
            yield apply(localStorage, localStorage.setItem, ['remember', true]);
        }

        yield apply(localStorage, localStorage.setItem, ['token', profile.token]);
        yield put(profileActions.fillProfile(profile));
        yield put(actions.change('forms.user.profile.firstName', profile.firstName));
        yield put(actions.change('forms.user.profile.lastName', profile.lastName));
        yield put(authActions.authenticate());
        yield put(uiActions.showNotification('Добро пожаловать!'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'login worker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
