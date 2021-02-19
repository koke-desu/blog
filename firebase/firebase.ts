// firebaseの型の定義などを行う。
import firebase from "firebase";

// apiKeyとか隠さなくていいらしい。環境変数使って必死に隠そうとしていたのに...
const firebaseConfig = {
  apiKey: "AIzaSyDCbFFl5zyshNwJYnWbLqVPVoWi5JhIW7g",
  authDomain: "firestore-sandbox-65754.firebaseapp.com",
  databaseURL: "https://firestore-sandbox-65754.firebaseio.com",
  projectId: "firestore-sandbox-65754",
  storageBucket: "firestore-sandbox-65754.appspot.com",
  messagingSenderId: "563808221570",
  appId: "1:563808221570:web:6552fda3af1f8011c4b79b",
  measurementId: "G-VLHP0NLSFE",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  //console.log(error);
}

export const DB = firebase.firestore();

// ここから型の定義。
// Firebaseの方でフィールド追加したら、こちらも変更すべし。
// tag, categoryは現在stringの配列として管理している。名前以外の情報を管理するようになったら、
// firebaseの方で参照型か、オブジェクト型にする。
export type Post = {
  title: string;
  body: string;
  category: string[];
  tag: string[];
  createTime?: Date;
  updateTime?: Date;
};
