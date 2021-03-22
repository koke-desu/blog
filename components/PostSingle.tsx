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
    <div className={`mt-10 p-10 bg-white relative`}>
      <div className="flex items-center justify-between">
        <h1 className="my-5 font-bold text-4xl">{post.title}</h1>
        <div className="flex  pr-1 items-center">
          {(() => {
            const update = new Date(post.updateTime);
            const create = new Date(post.createTime);
            if (update.toString() != create.toString()) {
              return (
                <>
                  <Image
                    src="/images/update_icon.png"
                    width={20}
                    height={20}
                    layout="fixed"
                  />
                  <p className="text-base ml-1">
                    {update.getFullYear() +
                      "/" +
                      (update.getMonth() + 1) +
                      "/" +
                      update.getDate()}
                  </p>
                </>
              );
            } else {
              return (
                <>
                  <Image src="/images/create_icon.png" width={20} height={16} />
                  <p>
                    {update.getFullYear() +
                      "/" +
                      (update.getMonth() + 1) +
                      "/" +
                      update.getDate()}
                  </p>
                </>
              );
            }
          })()}
        </div>
      </div>

      <div className="flex h-8 items-center">
        <Image
          src="/images/tag_icon.png"
          width={20}
          height={20}
          layout="fixed"
        />
        {post.tag.map((tag, index) => {
          return (
            <Link href={``} key={`tag_${tag.id}`}>
              <p className="px-1 ml-1 cursor-pointer self-auto text-lg border-b-2 border-white hover:border-gray-400 hover:text-gray-400">
                {index > 0 ? ", " + tag.name : tag.name}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="w-full h-52 md:h-96 lg:my-10 relative">
        <Image src={post.thumbnail} layout="fill" className="object-contain" />
      </div>
      <div className={`mt-10 markdown-body ${style.markdown_body}`}>
        <ReactMarkdown plugins={[[gfm]]} allowDangerousHtml>
          {/* サーバー側で、"\\n"にエスケープされた改行を"/n"にする。 */}
          {post.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}
