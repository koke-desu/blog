// firebaseの読み書きを行う関数を定義。
// すべてサーバーサイドで呼び出すこと！
import firebase from "firebase";
import { Post, Category } from "./firebase";
import admin from "./firebase_init";

// 記事の一覧を渡す。Promiseオブジェクトなので、
//   await getPosts().then((res) => {
//     return res;
//   })
//  みたいにして受け取る！！。
// awaitつけないとgetStaticPropsで受け取れない。
export const getPosts = async () => {
  const DB = admin.firestore();
  const data: Post[] = [];

  await DB.collection("posts")
    .get()
    .then((posts) => {
      posts.forEach((post) => {
        const post_data = post.data();
        const post_tmp: Post = {
          id: post.id,
          title: post_data.title,
          body: post_data.body,
          createTime: post_data.createTime.toDate(),
          updateTime: post_data.updateTime.toDate(),
          tag: post_data.tag,
          category: post_data.category,
        };
        data.push(post_tmp);
      });
    });
  return data;
};

// admin側で使う関数。
export const addPost = async (DB: FirebaseFirestore.Firestore, post: Post) => {
  const result: string = await DB.collection("posts")
    .add({
      ...post,
      createTime: firebase.firestore.Timestamp.fromDate(new Date()),
      updateTime: firebase.firestore.Timestamp.fromDate(new Date()),
    })
    .then(() => {
      return "add post successflly";
    })
    .catch(() => {
      return "error has occured!!";
    });

  return result;
};

// Firebase Storageから画像のパスを獲得する関数。
// 返されたURLをImageのsrcに設定すると画像を表示。
// pathにはFirebase Storageのルートからのpathを渡す。(例: "posts/1/image.png")
export const getImage = async (path: string) => {
  const Storage = admin.storage();
  const file = await Storage.bucket(process.env.FIREBASE_STORAGE_BUCKET).file(
    path
  );

  // 存在しないファイルが返された場合、public/images/no_image.pngへのパスを返す。
  if (
    !file.exists((err, exists) => {
      return exists;
    })
  ) {
    return "/images/no_image.png";
  }

  const img_url = await file.getSignedUrl({
    action: "read",
    expires: "12-31-2121",
  });
  //console.log(img_url);
  return img_url.toString();
};

//
export const getCategorys = async (DB: FirebaseFirestore.Firestore) => {
  //const data: Category[] =
};
