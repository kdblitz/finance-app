import firebase from '../firebase.config';
import { getUserInfo } from '../firebase.config';

export const ADD_USER = 'add_user';

export function addUser(userInfo) {
    return {
        type: ADD_USER,
        payload: userInfo
    };
}

let provider = new firebase.auth.GoogleAuthProvider();

export const FETCH_USER = 'fetch_user';

export function fetchUser() {
  return {
    type: FETCH_USER,
    payload: getUserInfo()
  };
}

export function login() {
  return dispatch => {
    firebase.auth().signInWithPopup(provider).then(loginSuccess => {
      console.log('success', loginSuccess);
      dispatch(fetchUser());
    }).catch(error => {
      console.log('error', error);
    });
  }
}

export function logout() {
  return dispatch => {
    firebase.auth().signOut().then(response => {
      console.log('successful signout');
      dispatch(fetchUser());
    }).catch(error => {
      console.log('failed signout');
    });
  }
}