import firebase from "firebase";

// firebaseの初期化。2度以上呼び出されるとエラーになる。
const firebaseConfig = {
  apiKey: process.env.apikey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const DB = firebase.firestore();
