// 記事一覧
// props.postsを変えればホームやタグ、カテゴリーの絞り込みでも使える。

import { Post } from "../firebase/firebase";
import Article from "./Article_thumbnail";

export default function ArticleList(props: { posts: Post[] }) {
  return (
    <div>
      {props.posts.map((post) => {
        return <Article post={post} />;
      })}
    </div>
  );
}
