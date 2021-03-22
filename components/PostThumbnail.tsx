// 記事一覧やタグ・カテゴリーの絞り込みを行った際に表示される、リストの一覧上での、それぞれの記事の表示。
// サムネ画像、タイトル、タグ、カテゴリーを表示する。
import { Post } from "../firebase/firebase";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const url = "/api/image/";

export default function PostThumbnail({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`} key={`post_${post.id}`}>
      <div className="w-full sm:w-6/12 my-5 mx-0 px-5">
        <div className="relative box-border text-white border-2 border-gray-400 shadow-md bg-main2">
          <Image src={post.thumbnail} width={480} height={270} />
          <Link href={`/category/${post.category.name}`}>
            <p className="absolute top-1 left-2 py-0.5 px-2 rounded-full bg-accent cursor-pointer text-sm text-black">
              {post.category.name}
            </p>
          </Link>
          <p className="p-1 text-xl">{"　" + post.title}</p>
          <div className="flex justify-between p-1">
            <div className="flex h-5">
              <Image src="/images/tag_icon.png" width={20} height={12} />
              {post.tag.map((tag, index) => {
                return (
                  <Link href={`/tag/${tag.id}`} key={`${post.id}_${tag.id}`}>
                    <p className="px-1 ml-1 cursor-pointer">
                      {" "}
                      {index > 0 ? ", " + tag.name : tag.name}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="absolute top-1 right-2 py-0.5 px-2 rounded-full bg-gray-400 text-xs flex text-right pr-1">
              {(() => {
                const update = new Date(post.updateTime);
                const create = new Date(post.createTime);
                if (update.toString() != create.toString()) {
                  return (
                    <>
                      <Image
                        src="/images/update_icon.png"
                        width={20}
                        height={16}
                      />
                      <p>
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
                      <Image
                        src="/images/create_icon.png"
                        width={20}
                        height={16}
                      />
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
        </div>
      </div>
    </Link>
  );
}
