import Link from "next/link";
import Image from "next/image";
import { Post } from "../firebase/firebase";
import ReactMarkdown from "react-markdown/with-html";
import gfm from "remark-gfm";
import "github-markdown-css";
import { useState } from "react";

const url = "http://localhost:3000/api/image/";

export default function PostSingle({ post }: { post: Post }) {
  const [img_url, set_img_url] = useState("/images/no_image.png");
  // api/image/[path]より画像を受け取る。
  fetch(url + post.id + "/thumbnail").then((res) => {
    res.json().then((json) => {
      if (json.url != "image not found") {
        set_img_url(json.url);
      }
    });
  });
  return (
    <div className="markdown-body p-6 bg-white mt-5">
      <div>
        <Image src={img_url} height={100} width={100} />
        <h1>{post.title}</h1>
      </div>
      <div className="flex">
        <Image src="/images/tag_icon.png" width={25} height={12} className="" />
        {post.tag.map((tag) => {
          return (
            <Link href="/">
              <p className="p-0.5 ml-1 cursor-pointer">{tag}</p>
            </Link>
          );
        })}
      </div>
      <ReactMarkdown plugins={[[gfm]]} allowDangerousHtml>
        {post.body}
      </ReactMarkdown>
    </div>
  );
}
