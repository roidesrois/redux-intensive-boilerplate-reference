// Core
import { put, apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

export function* callUpdateAvatarWorker ({ payload: [newAvatar] }) {
    try {
        yield put(uiActions.setFetchingState(true));
        const avatarFormData = yield new FormData();

        yield apply(avatarFormData, avatarFormData.append, ['avatar', newAvatar]);
        const response = yield apply(api, api.profile.updateAvatar, [avatarFormData]);

        const {
            data: { avatar: newAvatarUrl },
            message,
        } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(profileActions.updateAvatar(newAvatarUrl));
        yield put(actions.reset('forms.user.profile.avatar'));
    } catch (error) {
        yield put(uiActions.emitError(error, 'update avatar worker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
