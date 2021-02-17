// firebaseの型の定義などを行う。
import firebase from "firebase";

// 初期化は環境変数を使うため、サーバーサイドで行う必要があったので、
// index.tsxのgetStaticPropsで行っている。
export const DB = firebase.firestore();

// ここから型の定義。
// Firebaseの方でフィールド追加したら、こちらも変更すべし。
// タグやカテゴリーに名前以外のデータを後ほど追加するかもしれないので、別のコレクションとして管理しているが、
// 名前しか必要無いようなら、post内でstringとして受け取るように変更する。->そのほうが獲得楽だし、データ読み取り回数も少ない。
export type Tag = {
  name: string;
};

export type Category = {
  name: string;
};

export type Post = {
  title: string;
  body: string;
  category: Category;
  tag: Tag;
  createTime: Date;
  updateTime: Date;
};
