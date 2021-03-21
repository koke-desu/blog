import Link from "next/link";
import Image from "next/image";
import { Post } from "../firebase/firebase";
import ReactMarkdown from "react-markdown/with-html";
import gfm from "remark-gfm";
import { useState } from "react";
// githubのmdと同様なcss
import "github-markdown-css";
// markdownの表示のカスタマイズ。
import style from "./css/markdown_style.module.css";

export default function PostSingle({ post }: { post: Post }) {
  return (
    <div className={style.markdown_body + " markdown-body p-6 bg-white mt-5"}>
      <div>
        <Image src={post.thumbnail} height={100} width={100} />
        <h1>{post.title}</h1>
      </div>
      <div className="flex h-8">
        <Image src="/images/tag_icon.png" width={25} height={26} className="" />
        {post.tag.map((tag, index) => {
          return (
            <Link href="/" key={`tag_${tag}`}>
              <p className="p-0.5 ml-1 cursor-pointer self-auto text-lg">
                {index > 0 ? ", " + tag : tag}
              </p>
            </Link>
          );
        })}
      </div>
      <ReactMarkdown plugins={[[gfm]]} allowDangerousHtml>
        {/* サーバー側で、"\\n"にエスケープされた改行を"/n"にする。 */}
        {post.body}
      </ReactMarkdown>
    </div>
  );
}
