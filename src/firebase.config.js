import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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