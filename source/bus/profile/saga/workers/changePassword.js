// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';

export function* callChangePasswordWorker ({ payload: { oldPassword, newPassword: password }}) {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield apply(api, api.profile.updateProfile, [
            {
                oldPassword,
                password,
            }
        ]);

        if (response.status !== 200) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        yield put(actions.reset('forms.user.password'));
        yield put(uiActions.showNotification('Пароль успешно изменён'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'update profile worker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
