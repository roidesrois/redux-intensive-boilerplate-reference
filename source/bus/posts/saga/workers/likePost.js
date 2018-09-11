// Core
import { put, select, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { postsActions } from '../../actions';

export function* likePost ({ payload: postId }) {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield apply(api, api.posts.like, [postId]);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        const liker = yield select((state) => {
            return state.profile.remove('avatar').remove('token');
        });

        yield put(postsActions.likePost({ postId, liker }));
    } catch (error) {
        yield put(uiActions.emitError(error, 'like post worker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
