// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { postsActions } from '../../actions';

export function* removePost ({ payload: postId }) {
    try {
        yield put(uiActions.setFetchingState(true));

        const response = yield apply(api, api.posts.remove, [postId]);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        yield put(postsActions.removePost(postId));
    } catch (error) {
        yield put(uiActions.emitError(error, 'remove post worker'));
    } finally {
        yield put(uiActions.setFetchingState(false));
    }
}
