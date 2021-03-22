// サイドバーのコンポーネント
// プロフィール、カテゴリーとかを設置。
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Children } from "react";
import { Category, Tags } from "../firebase/firebase";

export default function SideBar({
  categories,
  tags,
}: {
  categories: Category[];
  tags: Tags[];
}) {
  return (
    <div className="">
      <div className="mt-10 bg-white shadow-md">
        <Link href="/">
          <div className="text-center">
            <div className="bg-main2 flex p-2">
              <Image src="/images/profile_icon.png" width="30" height="25" />
              <h2 className="text-white text-xl inline-block self-center ml-2">
                プロフィール
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-full w-24 h-24 mx-auto my-2">
              <Image
                src="/images/profile.jpg"
                width="100"
                height="100"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>

            <p className="text-lg mb-1">koke</p>
            <p>webフロントエンドを勉強中の人。</p>
          </div>
        </Link>
      </div>
      <div className="mt-10 bg-white shadow-md">
        <Link href="/">
          <div className="text-center">
            <div className="bg-main2 flex p-2">
              <Image src="/images/category_icon.png" width="30" height="25" />
              <h2 className="text-white text-xl inline-block self-center ml-2">
                カテゴリー
              </h2>
            </div>
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.id} className="text-left p-1 pl-5">
                    <Link href={"/categories/" + category.id}>
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Link>
      </div>
      <div className="mt-10 bg-white shadow-md">
        <Link href="/">
          <div className="text-center">
            <div className="bg-main2 flex p-2">
              <Image src="/images/tag_icon.png" width="30" height="25" />
              <h2 className="text-white text-xl inline-block self-center ml-2">
                タグ
              </h2>
            </div>
            <div>
              {tags.map((tags) => {
                return (
                  <div key={tags.id}>
                    <p className="text-left font-bold p-1 ml-5">{tags.name}</p>
                    <ul className=" list-disc text-left ml-10">
                      {tags.children.map((tag) => {
                        return (
                          <li key={tag.id} className="">
                            <Link href={"/tags/" + tag.id}>{tag.name}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-10 bg-white shadow-md">
        <Link href="/">
          <div className="">
            <div className="bg-main2 flex p-2">
              <h2 className="text-white text-xl ml-5">このブログについて</h2>
            </div>
            <p className="p-2">
              {"　"}
              Next.jsとFirebaseを使って自作したブログです。管理者の技術力の向上とともにブログも改良していくつもりです。
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
