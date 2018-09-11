// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../../auth/actions';
import { profileActions } from '../../../profile/actions';

export function* callAuthenticateWorker () {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield apply(api, api.auth.authenticate);
        const { data: profile, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            if (response.status === 401) {
                yield apply(localStorage, localStorage.removeItem, ['token']);

                return null;
            }

            throw new Error(message);
        }

        yield put(
            actions.change('forms.user.profile.firstName', profile.firstName),
        );
        yield put(
            actions.change('forms.user.profile.lastName', profile.lastName),
        );
        yield put(profileActions.fillProfile(profile));
        yield put(authActions.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, 'authenticate worker'));
    } finally {
        yield put(authActions.initialize());
        yield put(uiActions.setFetchingState(false));
    }
}
