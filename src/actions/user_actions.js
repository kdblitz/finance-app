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

export const LOGIN = 'login';

export function login() {
  console.log('login :O');
  return dispatch => {
    console.log('trigger');
    firebase.auth().signInWithPopup(provider).then(loginSuccess => {
      console.log('success', loginSuccess);
      dispatch({
        type: FETCH_USER,
        payload: getUserInfo()
      });
    }).catch(error => {
      console.log('error', error);
    });
  }
}

export const LOGOUT = 'logout';

export function logout() {
  return dispatch => {
    firebase.auth().signOut().then(response => {
      console.log('successful signout');
      dispatch({
        type: FETCH_USER,
        payload: getUserInfo()
      });
    }).catch(error => {
      console.log('failed signout');
    });
  }
}