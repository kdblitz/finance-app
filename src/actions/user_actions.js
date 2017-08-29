export const ADD_USER = 'add_user';

export function addUser(userInfo) {
    return {
        type: ADD_USER,
        payload: userInfo
    };
}