// firebaseの型の定義などを行う。
import firebase from "firebase";

// 初期化は環境変数を使うため、サーバーサイドで行う必要があったので、
// index.tsxのgetStaticPropsで行っている。

// ここから型の定義。
// Firebaseの方でフィールド追加したら、こちらも変更すべし。
// tag, categoryは現在stringの配列として管理している。名前以外の情報を管理するようになったら、
// firebaseの方で参照型か、オブジェクト型にする。

export type Post = {
  title: string;
  body: string;
  category: string[];
  tag: string[];
  createTime: Date;
  updateTime: Date;
};
