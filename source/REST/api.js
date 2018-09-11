// Instruments
import { MAIN_URL, groupId } from './config';

export const api = {
    get token () {
        return localStorage.getItem('token');
    },
    get authHeaders () {
        return {
            Authorization: this.token,
        };
    },
    get dataHeaders () {
        return {
            Authorization:  this.token,
            'Content-Type': 'application/json',
        };
    },
    auth: {
        signup (userInfo) {
            return fetch(`${MAIN_URL}/user/${groupId}`, {
                method:  'POST',
                headers: this.dataHeaders,
                body:    JSON.stringify(userInfo),
            });
        },
        login (credentials) {
            return fetch(`${MAIN_URL}/user/login`, {
                method:  'POST',
                headers: this.dataHeaders,
                body:    JSON.stringify(credentials),
            });
        },
        authenticate () {
            return fetch(`${MAIN_URL}/user/login`, {
                method:  'POST',
                headers: this.dataHeaders,
                body:    JSON.stringify({ token: this.token }),
            });
        },
        logout () {
            return fetch(`${MAIN_URL}/user/logout`, {
                method:  'GET',
                headers: this.authHeaders,
            });
        },
    },
    posts: {
        fetch () {
            return fetch(`${MAIN_URL}/feed`, {
                method:  'GET',
                headers: {
                    'x-no-auth': groupId,
                },
            });
        },
        create (comment) {
            return fetch(`${MAIN_URL}/feed`, {
                method:  'POST',
                headers: this.dataHeaders,
                body:    JSON.stringify({
                    comment,
                }),
            });
        },
        remove (postId) {
            return fetch(`${MAIN_URL}/feed/${postId}`, {
                method:  'DELETE',
                headers: this.authHeaders,
            });
        },
        like (postId) {
            return fetch(`${MAIN_URL}/feed/like/${postId}`, {
                method:  'PUT',
                headers: this.authHeaders,
            });
        },
    },
    profile: {
        updateProfile (profileInfo) {
            return fetch(`${MAIN_URL}/user`, {
                method:  'PUT',
                headers: this.dataHeaders,
                body:    JSON.stringify(profileInfo),
            });
        },
        updateAvatar (avatarFormData) {
            return fetch(`${MAIN_URL}/image`, {
                method:  'POST',
                headers: this.authHeaders,
                body:    avatarFormData,
            });
        },
    },
    users: {
        fetch () {
            return fetch(`${MAIN_URL}/user/all`, {
                method:  'GET',
                headers: this.authHeaders,
            });
        },
    },
};
