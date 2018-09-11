// Core
import { v4 } from 'uuid';

// Instruments
import { types } from './types';

export const uiActions = {
    setFetchingState: (state) => ({
        type:    types.SET_FETCHING_STATE,
        payload: state,
    }),
    emitError: (error, meta = null) => ({
        type:    types.EMIT_ERROR,
        payload: error,
        error:   true,
        meta,
    }),
    showNotification: (message, type = 'info', source = '') => ({
        type:    types.SHOW_NOTIFICATION,
        payload: {
            id: v4(),
            message,
            type,
            source,
        },
    }),
    hideNotification: () => ({
        type: types.HIDE_NOTIFICATION,
    }),
    setOnlineState: (state) => ({
        type:    types.SET_ONLINE_STATE,
        payload: state,
    }),
};
