import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { Post } from "../firebase/firebase";
import ReactMarkdown from "react-markdown/with-html";
import gfm from "remark-gfm";
import { useState } from "react";
// githubのmdと同様なcss
import "github-markdown-css";
// markdownの表示のカスタマイズ。
import MDstyle from "./css/markdown_style.module.css";

const site_url = "https://koke-tech-blog.vercel.app/";

export default function PostSingle({ post }: { post: Post }) {
  const router = useRouter();

  return (
    <div className={`my-10 p-10 bg-white relative`}>
      <Head>
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.body} />
        <meta name="twitter:image" content={post.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex  pr-1 items-center absolute right-5">
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
      <h1 className="my-5 font-bold text-4xl">{post.title}</h1>
      <div className="flex items-center justify-between"></div>

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
      <div className={`mt-16 markdown-body ${MDstyle.markdown_body}`}>
        <ReactMarkdown plugins={[[gfm]]} allowDangerousHtml>
          {post.body}
        </ReactMarkdown>
      </div>
      <div
        className="w-16 h-8 rounded-md flex mt-20"
        style={{ backgroundColor: "#1DA1F2" }}
      >
        <a
          href={`https://twitter.com/share?url=${site_url}/posts/${post.id}`}
          rel="nofollow"
          className="p-1 pl-1.5 self-center flex justify-center items-center"
        >
          <div className="">
            <Image
              src="/images/2021 Twitter logo - white.png"
              width="16"
              height="16"
            />
          </div>
          <span className="text-sm font-bold text-white ml-2">共有</span>
        </a>
      </div>
    </div>
  );
}
