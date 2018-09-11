// Instruments
import { uiActions } from '../../bus/ui/actions';

export function customThunk (store) {
    return function (next) {
        return function (action) {
            if (typeof action === 'function') {
                return action(store.dispatch, store.getState);
            }

            return next(action);
        };
    };
}

export const notifications = (store) => (next) => (action) => {
    if (action.error) {
        store.dispatch(uiActions.showNotification(action.payload.message, 'error', action.meta));
    }

    next(action);
};
