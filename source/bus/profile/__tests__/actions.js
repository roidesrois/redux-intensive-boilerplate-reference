// Core
import { profileActions } from '../actions';

describe('profile actions:', () => {
    // Sync
    test('fillProfile snapshot', () => {
        expect(profileActions.fillProfile(__.userProfile)).toMatchSnapshot();
    });

    test('updateAvatar snapshot', () => {
        expect(profileActions.updateAvatar(__.url)).toMatchSnapshot();
    });

    test('clearProfile snapshot', () => {
        expect(profileActions.clearProfile()).toMatchSnapshot();
    });

    // Async
    test('updateNameAsync snapshot', () => {
        expect(
            profileActions.updateNameAsync(__.userProfile),
        ).toMatchSnapshot();
    });

    test('updateAvatar snapshot', () => {
        expect(
            profileActions.updateAvatarAsync(__.userProfile),
        ).toMatchSnapshot();
    });

    test('updatePasswordAsync snapshot', () => {
        expect(
            profileActions.updatePasswordAsync(__.userProfile),
        ).toMatchSnapshot();
    });
});
