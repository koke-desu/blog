// // firebaseの読み書きを行う関数を定義。
import firebase from "firebase";
import { DB, Post } from "./firebase";

const getTag = (x: any) => {
  return { name: "タグ" };
};

const getCategory = (x: any) => {
  return { name: "カテゴリー" };
};

export const getPosts = async () => {
  const data: Post[] = [];
  await DB.collection("posts")
    .get()
    .then((posts) => {
      posts.forEach((post) => {
        const post_data = post.data();
        console.log(posts + "あ");
        const post_tmp: Post = {
          title: post_data.title,
          body: post_data.body,
          createTime: new Date(post_data.createTime),
          updateTime: new Date(post_data.updateTime),
          tag: getTag(post_data.tagRef),
          category: getCategory(post_data.categoryRef),
        };
        data.push(post_tmp);
      });
    });
  console.log(data);
  return data;
};

// export const getPosts = async () => {
//   const data = await DB.collection("posts")
//     .doc("a")
//     .get()
//     .then((result) => {
//       console.log(result);
//       return result.data();
//     });

//   console.log(data);
//   return data;
// };
