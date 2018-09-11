// Instruments
import { authActions } from '../actions';
import { types } from '../types';

describe('auth actions:', () => {
    test('authenticate', () => {
        expect(authActions.authenticate()).toEqual({
            type: types.AUTHENTICATE,
        });
    });

    test('initialize', () => {
        expect(authActions.initialize()).toEqual({
            type: types.INITIALIZE,
        });
    });

    test('logout', () => {
        expect(authActions.logout()).toEqual({
            type: types.LOGOUT,
        });
    });

    test('initialize async', () => {
        expect(authActions.initializeAsync()).toEqual({
            type: types.INITIALIZE_ASYNC,
        });
    });

    test('login async ', () => {
        expect(authActions.loginAsync(__.credentials)).toEqual({
            type:    types.LOGIN_ASYNC,
            payload: __.credentials,
        });
    });

    test('authenticate async ', () => {
        expect(authActions.authenticateAsync()).toEqual({
            type: types.AUTHENTICATE_ASYNC,
        });
    });

    test('signup async ', () => {
        expect(authActions.signupAsync(__.userProfile)).toEqual({
            type:    types.SIGNUP_ASYNC,
            payload: __.userProfile,
        });
    });

    test('logout async ', () => {
        expect(authActions.logoutAsync()).toEqual({
            type: types.LOGOUT_ASYNC,
        });
    });
});
