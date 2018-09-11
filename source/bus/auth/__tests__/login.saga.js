// Core
import { put, apply } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { actions } from 'react-redux-form';

// Instruments
import { api } from '../../../REST';
import { uiActions } from '../../ui/actions';
import { authActions } from '../../auth/actions';
import { profileActions } from '../../profile/actions';
import { callLoginWorker } from '../saga/workers/login';

const loginAction = authActions.loginAsync(__.credentials);

const saga = cloneableGenerator(callLoginWorker)(loginAction);
let clone = null;

describe('login saga:', () => {
    describe('should pass until response received', () => {
        test('should dispatch setFetchingState action', () => {
            expect(saga.next().value).toEqual(put(uiActions.setFetchingState(true)));
        });

        test('should call a fetch request', () => {
            expect(saga.next().value).toEqual(apply(api, api.auth.login, [__.credentials]));
        });
    });

    describe('should handle a 400 status response', () => {
        test('a fetch request should return a 400 status response data object', () => {
            clone = saga.clone();
            
            expect(clone.next(__.fetchResponseFail400).value).toEqual(
                apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            );
        });

        test('should contain a 400 status response data object', () => {
            expect(clone.next(__.responseDataFail).value).toEqual(put(uiActions.emitError(__.error, 'login worker')));
        });

        test('should dispatch setFetchingState action', () => {
            expect(clone.next().value).toEqual(put(uiActions.setFetchingState(false)));
        });

        test('should finish', () => {
            expect(clone.next().done).toBe(true);
        });
    });

    describe('should handle a 200 status response', () => {
        test('a fetch request should return a 200 status response data object', () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });

        test('localStorage should contain a «remember» flag', () => {
            expect(saga.next(__.responseDataSuccess).value).toEqual(
                apply(localStorage, localStorage.setItem, ['remember', true])
            );
        });

        test('localStorage should contain a token', () => {
            expect(saga.next().value).toEqual(apply(localStorage, localStorage.setItem, ['token', __.token]));
        });

        test('should dispatch fillProfile action', () => {
            expect(saga.next().value).toEqual(put(profileActions.fillProfile(__.userProfile)));
        });

        test('should dispatch react-redux-form change action', () => {
            expect(saga.next().value).toEqual(
                put(actions.change('forms.user.profile.firstName', __.userProfile.firstName))
            );
        });

        test('should dispatch react-redux-form change action', () => {
            expect(saga.next().value).toEqual(
                put(actions.change('forms.user.profile.lastName', __.userProfile.lastName))
            );
        });

        test('should dispatch authenticate action', () => {
            expect(saga.next().value).toEqual(put(authActions.authenticate()));
        });

        test('should dispatch showNotification action', () => {
            expect(saga.next().value).toEqual(put(uiActions.showNotification('Добро пожаловать!')));
        });

        test('should dispatch setFetchingState action', () => {
            expect(saga.next().value).toEqual(put(uiActions.setFetchingState(false)));
        });

        test('should finish', () => {
            expect(saga.next().done).toBe(true);
        });
    });
});
