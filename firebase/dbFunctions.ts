// // firebaseの読み書きを行う関数を定義。
import firebase from "firebase";
import { Post } from "./firebase";

// 記事の一覧を渡す。Promiseオブジェクトなので、
//   await getPosts().then((res) => {
//     return res;
//   })
//  みたいにして受け取る！！。
// awaitつけないとgetStaticPropsで受け取れない。
export const getPosts = async () => {
  const DB = firebase.firestore();
  const data: Post[] = [];
  await DB.collection("posts")
    .get()
    .then((posts) => {
      posts.forEach((post) => {
        const post_data = post.data();
        const post_tmp: Post = {
          title: post_data.title,
          body: post_data.body,
          createTime: post_data.createTime.toDate(),
          updateTime: post_data.updateTime.toDate(),
          tag: post_data.tags,
          category: post_data.categorys,
        };
        data.push(post_tmp);
      });
    });
  console.log(data);
  return data;
};

// export const addPost = async(post: Post) => {
//   const result: string = await DB.collection("post").add({
//     ...post,
//     createTime: firebase.firestore.Timestamp.fromDate(new Date()),
//     updateTime: firebase.firestore.Timestamp.fromDate(new Date()),
//     tag:
//   })
// }
