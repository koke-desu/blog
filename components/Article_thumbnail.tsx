// 記事一覧やタグ・カテゴリーの絞り込みを行った際に表示される、リストの一覧上での、それぞれの記事の表示。
// サムネ画像、タイトル、タグ、カテゴリーを表示する。
import { Post } from "../firebase/firebase";
import { useState } from "react";
import Image from "next/image";

const url = "http://localhost:3000/api/";

export default function Article(props: { post: Post }) {
  const [img_url, set_img_url] = useState("/images/no_image.png");
  fetch(url + props.post.id + "/thumbnail").then((res) => {
    res.json().then((json) => {
      if (json.url != "image not found") {
        set_img_url(json.url);
      }
    });
  });

  return (
    <div>
      <p>{props.post.category}</p>
      <Image src={img_url} width="100" height="100" />
      <p>{props.post.title}</p>
      {props.post.tag.map((tag) => {
        return <p>{tag}</p>;
      })}
      <p>
        {props.post.updateTime != props.post.createTime
          ? props.post.updateTime
          : props.post.createTime}
      </p>
    </div>
  );
}
