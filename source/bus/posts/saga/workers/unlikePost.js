// Core
import { put, select, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { postsActions } from '../../actions';

export function* unlikePost ({ payload: postId }) {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield apply(api, api.posts.like, [postId]);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        const userId = yield select((state) => state.profile.get('id'));

        yield put(postsActions.unlikePost({ postId, userId }));
    } catch (error) {
        yield put(uiActions.emitError(error, 'unlike post worker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
