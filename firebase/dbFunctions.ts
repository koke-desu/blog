// firebaseの読み書きを行う関数を定義。
// すべてサーバーサイドで呼び出すこと！
// getStaticPropsで呼び出すか、apiルート経由で呼び出す。
import firebase from "firebase";
import { Post, Category, Tag, Tags } from "./firebase";
import admin from "./firebase_init";

// 1つのページに表示する記事の数。
// これを使ってページング。
export const page_posts = 2;

// idを配列で指定してタグの配列を獲得。
const getTagsById = async (ids: string[]) => {
  const DB: FirebaseFirestore.Firestore = admin.firestore();
  let tags_result: Tag[] = [];

  const tags = await DB.collection("tags").get();

  for (let group of tags.docs) {
    await group.ref
      .collection("children")
      .get()
      .then((tags) => {
        tags.forEach((tag) => {
          ids.forEach((id) => {
            if (tag.id == id) {
              tags_result.push({ id: tag.id, name: tag.data().name });
            }
          });
        });
      });
  }

  return tags_result;
};

// idを指定して、カテゴリーを獲得。
const getCategoryById = async (id: string) => {
  const DB: FirebaseFirestore.Firestore = admin.firestore();
  const categories = await DB.collection("categories").get();
  for (let category of categories.docs) {
    if (category.id == id)
      return {
        id: category.id,
        name: category.data().name,
      };
  }

  return { id: id, name: id };
};

// idを指定して一つ記事を獲得。
export const getPost = async (id: string) => {
  const DB = admin.firestore();
  const snapshot = await DB.collection("posts").doc(id).get();

  //記事が存在しない場合エラーを投げる。
  if (snapshot.empty) {
    throw "post not found";
  }

  const post_data = snapshot.data();

  const post: Post = {
    id: snapshot.id,
    title: post_data.title,
    body: post_data.body,
    createTime: post_data.createTime.toDate(),
    updateTime: post_data.updateTime.toDate(),
    tag: await getTagsById(post_data.tag),
    category: await getCategoryById(post_data.category),
    public: post_data.public,
    thumbnail: post_data.thumbnail
      ? post_data.thumbnail
      : "/images/no_image.png",
  };

  return post;
};

// 記事の一覧を渡す。
// クエリ処理を引数で指定することが出来る。クエリの指定方法はwhere()と同じく、
// (対象の属性, 演算子, 値)の形式。 参照(https://firebase.google.com/docs/firestore/query-data/queries?authuser=0)
// 引数を指定しない場合はすべての投稿を返す。
// 第4引数でページングする。存在しないページを開いた場合は404投げたい。
// ページを設定しない場合は、クエリに当てはまるすべてのデータを渡す。
export const getAllPosts = async (
  atr = "createTime",
  ope: FirebaseFirestore.WhereFilterOp = "!=",
  val: any = "",
  page = 0
) => {
  const DB: FirebaseFirestore.Firestore = admin.firestore();
  const data: Post[] = [];

  let ref: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = await DB.collection(
    "posts"
  )
    .where(atr, ope, val)
    .orderBy("createTime", "desc");

  if (page == 0) {
    ref = await DB.collection("posts")
      .where(atr, ope, val)
      .orderBy("createTime", "desc");
  } else if (page == 1) {
    ref = await DB.collection("posts")
      .where(atr, ope, val)
      .orderBy("createTime", "desc")
      .limit(page_posts);
  } else {
    const snapshot = await DB.collection("posts")
      .orderBy("createTime", "desc")
      .where(atr, ope, val)
      .limit(page_posts * (page - 1))
      .get();
  }

  const posts = await ref
    .get()
    .then((posts) => {
      return posts;
    })
    .catch((err) => {
      console.log(err);
    });

  if (!posts) {
    console.error("posts is void!!!");
    return [];
  }

  for (let post of posts.docs) {
    const post_data = post.data();
    const post_tmp: Post = {
      id: post.id,
      title: post_data.title,
      body: post_data.body,
      createTime: post_data.createTime.toDate(),
      updateTime: post_data.updateTime.toDate(),
      tag: await getTagsById(post_data.tag),
      category: await getCategoryById(post_data.category),
      public: post_data.public,
      thumbnail: post_data.thumbnail
        ? post_data.thumbnail
        : "/images/no_image.png",
    };
    data.push(post_tmp);
  }
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
  const file = await Storage.bucket(process.env.FIREBASE_STORAGE_BUCKET)
    .file(path)
    .catch((error) => {
      return "/images/no_image.png";
    });

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

  return img_url.toString();
};

// すべてのカテゴリーを獲得する。
export const getCategories = async () => {
  const DB = admin.firestore();
  const data: Category[] = [];

  await DB.collection("categories")
    .get()
    .then((categories) => {
      categories.forEach((category) => {
        const category_tmp: Category = {
          id: category.id,
          name: category.data().name,
        };
        data.push(category_tmp);
      });
    });
  return data;
};

// 全てのタグを獲得する。タグは種類ごとに2重のオブジェクトで管理される。Type Tagsを参照。
export const getTags = async () => {
  const DB: FirebaseFirestore.Firestore = admin.firestore();
  const data: Tags[] = [];

  await DB.collection("tags")
    .get()
    .then((tags) => {
      tags.forEach((group) => {
        const tags_tmp: Tags = {
          id: group.id,
          name: group.data().name,
          children: [],
        };
        data.push(tags_tmp);
      });
    });

  for (let i = 0; i < data.length; i++) {
    await DB.collection("tags")
      .doc(data[i].id)
      .collection("children")
      .get()
      .then((tags) => {
        tags.forEach((tag) => {
          data[i].children.push({ id: tag.id, name: tag.data().name });
        });
      });
  }

  return data;
};
