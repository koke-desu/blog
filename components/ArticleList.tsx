// 記事一覧
// props.postsを変えればホームやタグ、カテゴリーの絞り込みでも使える。

import { Post } from "../firebase/firebase";
import Article from "./Article_thumbnail";

export default function ArticleList(props: { posts: Post[] }) {
  return (
    <div className="flex p-2 flex-wrap justify-around">
      {props.posts.map((post) => {
        return <Article post={post} key={post.id} />;
      })}
    </div>
  );
}
