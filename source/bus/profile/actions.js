// Types
import { types } from './types';

export const profileActions = {
    // Sync
    fillProfile: (profile) => ({
        type:    types.FILL_PROFILE,
        payload: profile,
    }),
    updateAvatar: (newAvatarUrl) => ({
        type:    types.UPDATE_AVATAR,
        payload: newAvatarUrl,
    }),
    clearProfile: () => ({
        type: types.CLEAR_PROFILE,
    }),

    // Async
    updateNameAsync: (newName) => ({
        type:    types.UPDATE_NAME_ASYNC,
        payload: newName,
    }),
    updateAvatarAsync: (newAvatar) => ({
        type:    types.UPDATE_AVATAR_ASYNC,
        payload: newAvatar,
    }),
    updatePasswordAsync: (newPassword) => ({
        type:    types.UPDATE_PASSWORD_ASYNC,
        payload: newPassword,
    }),
};
