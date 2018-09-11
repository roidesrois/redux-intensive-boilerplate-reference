// Core
import { uiActions } from '../actions';

describe('ui actions:', () => {
    test('setFetchingState snapshot', () => {
        expect(uiActions.setFetchingState(true)).toMatchSnapshot();
    });

    test('emitError snapshot', () => {
        expect(uiActions.emitError(__.error, 'meta info')).toMatchSnapshot();
    });

    test('emitError with fallback params snapshot', () => {
        expect(uiActions.emitError(__.error, void 0)).toMatchSnapshot();
    });

    test('showNotification snapshot', () => {
        expect(
            uiActions.showNotification('login fail', 'error', 'login worker'),
        ).toMatchSnapshot();
    });

    test('showNotification with fallback params snapshot', () => {
        expect(
            uiActions.showNotification(void 0, 'login fail', void 0),
        ).toMatchSnapshot();
    });

    test('hideNotification', () => {
        expect(uiActions.hideNotification('123')).toMatchSnapshot();
    });

    test('setOnlineState snapshot', () => {
        expect(uiActions.setOnlineState(true)).toMatchSnapshot();
    });
});
