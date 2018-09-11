// Core
import { apply } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { callAuthenticateWorker } from '../saga/workers/authenticate';
import { authActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { profileActions } from '../../profile/actions';

const authenticateAction = authActions.authenticateAsync(__.token);
const error = new Error(__.errorMessage);

describe('authenticate saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(callAuthenticateWorker, authenticateAction)
            .put(uiActions.setFetchingState(true))
            .provide([
                [apply(api, api.auth.authenticate), __.fetchResponseSuccess]
            ])
            .apply(api, api.auth.authenticate)
            .put(
                actions.change(
                    'forms.user.profile.firstName',
                    __.userProfile.firstName,
                ),
            )
            .put(
                actions.change(
                    'forms.user.profile.lastName',
                    __.userProfile.lastName,
                ),
            )
            .put(profileActions.fillProfile(__.userProfile))
            .put(authActions.authenticate())
            .put(authActions.initialize())
            .put(uiActions.setFetchingState(false))
            .run();
    });

    test('should complete a 401 status response scenario', async () => {
        await expectSaga(callAuthenticateWorker, authenticateAction)
            .put(uiActions.setFetchingState(true))
            .provide([
                [apply(api, api.auth.authenticate), __.fetchResponseFail401]
            ])
            .apply(api, api.auth.authenticate)
            .apply(localStorage, localStorage.removeItem, ['token'])
            .returns(null)
            .put(authActions.initialize())
            .put(uiActions.setFetchingState(false))
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(callAuthenticateWorker, authenticateAction)
            .put(uiActions.setFetchingState(true))
            .provide([
                [apply(api, api.auth.authenticate), __.fetchResponseFail400]
            ])
            .apply(api, api.auth.authenticate)
            .put(authActions.initialize())
            .put(uiActions.setFetchingState(false))
            .put(uiActions.emitError(error, 'authenticate worker'))
            .run();
    });
});
