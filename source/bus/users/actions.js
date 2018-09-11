// Types
import { types } from './types';

export const usersActions = {
    // Sync
    fillUsers: (users) => ({
        type:    types.FILL_USERS,
        payload: users,
    }),
    clearUsers: () => ({
        type: types.CLEAR_USERS,
    }),

    // Async
    fetchUsersAsync: () => ({
        type: types.FETCH_USERS_ASYNC,
    }),
};
