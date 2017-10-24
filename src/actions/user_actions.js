import firebase from '../firebase.config';

export const ADD_USER = 'add_user';

export function addUser(userInfo) {
    return {
        type: ADD_USER,
        payload: userInfo
    };
}

let provider = new firebase.auth.GoogleAuthProvider();

export function login() {
  firebase.auth().signInWithPopup(provider).then(loginSuccess => {
    console.log('success', loginSuccess);
  }).catch(error => {
    console.log('error', error);
  });
}

export function logout() {
  firebase.auth().signOut().then(response => {
    console.log('successful signout');
  }).catch(error => {
    console.log('failed signout');
  });
}