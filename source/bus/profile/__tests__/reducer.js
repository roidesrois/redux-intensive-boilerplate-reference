// Core
import { Map } from 'immutable';

// Instruments
import { profileReducer } from '../reducer';
import { profileActions } from '../actions';

const initialState = Map(__.userProfile);

describe('profile reducer:', () => {
    test(`should return initial state by default`, () => {
        expect(profileReducer(void 0, {})).toMatchSnapshot();
    });

    test('should handle fillProfile action', () => {
        expect(
            profileReducer(void 0, profileActions.fillProfile(__.userProfile)),
        ).toMatchSnapshot();
    });

    test('should handle updateAvatar action', () => {
        expect(
            profileReducer(void 0, profileActions.updateAvatar(__.url)),
        ).toMatchSnapshot();
    });

    test('should handle clearProfile action', () => {
        expect(
            profileReducer(initialState, profileActions.clearProfile()),
        ).toMatchSnapshot();
    });
});
