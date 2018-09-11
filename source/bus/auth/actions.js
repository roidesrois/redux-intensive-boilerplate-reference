// Types
import { types } from './types';

export const authActions = {
    // Sync
    initialize: () => ({
        type: types.INITIALIZE,
    }),
    authenticate: () => ({
        type: types.AUTHENTICATE,
    }),
    logout: () => ({
        type: types.LOGOUT,
    }),

    // Async
    initializeAsync: () => ({
        type: types.INITIALIZE_ASYNC,
    }),
    loginAsync: (credentials) => ({
        type:    types.LOGIN_ASYNC,
        payload: credentials,
    }),
    authenticateAsync: () => ({
        type: types.AUTHENTICATE_ASYNC,
    }),
    signupAsync: (userData) => ({
        type:    types.SIGNUP_ASYNC,
        payload: userData,
    }),
    logoutAsync: () => ({
        type: types.LOGOUT_ASYNC,
    }),
};
