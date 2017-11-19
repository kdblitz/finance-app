import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const PUBLIC_USER = 'public';

const config = {
  apiKey: "AIzaSyCb4Qc3jpLBRQZGg91GMrE1qN0cu5pdP4c",
  authDomain: "singils-app.firebaseapp.com",
  databaseURL: "https://singils-app.firebaseio.com",
  projectId: "singils-app",
  storageBucket: "singils-app.appspot.com",
  messagingSenderId: "505027770679"
};

firebase.initializeApp(config);

export default firebase;

export function getUserInfo() {
  return JSON.parse(
    window.localStorage.getItem(`firebase:authUser:${config.apiKey}:[DEFAULT]`));
}

export function getUid() {
  const userInfo = getUserInfo();
  return userInfo ? userInfo.uid : PUBLIC_USER;
}