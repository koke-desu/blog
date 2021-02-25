// サイドバーのコンポーネント
// プロフィール、カテゴリーとかを設置。
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Children } from "react";

export default function Header() {
  return (
    <div className="">
      <section className="mt-10 bg-white shadow-md">
        <Link href="/">
          <div className="text-center">
            <div className="bg-main2 flex p-2">
              <Image src="/images/profile_icon.png" width="40" height="30" />
              <h2 className="text-white text-xl inline-block self-center">
                プロフィール
              </h2>
            </div>
            <Image
              src="/images/profile.png"
              width="100"
              height="100"
              className="justify-self-center"
            />
            <p className="text-lg mb-1">koke</p>
            <p>webフロントエンドを勉強中の人。</p>
          </div>
        </Link>
      </section>
      <section className="mt-10 bg-white shadow-md">
        <Link href="/">
          <div className="text-center">
            <div className="bg-main2 flex p-2">
              <Image src="/images/category_icon.png" width="30" height="25" />
              <h2 className="text-white text-xl inline-block self-center">
                カテゴリー
              </h2>
            </div>
            <p></p>
          </div>
        </Link>
      </section>
      <section className="mt-10 bg-white shadow-md">
        <Link href="/">
          <div className="text-center">
            <div className="bg-main2 flex p-2">
              <Image src="/images/tag_icon.png" width="30" height="25" />
              <h2 className="text-white text-xl inline-block self-center">
                タグ
              </h2>
            </div>
            <p></p>
          </div>
        </Link>
      </section>
      <section className="mt-10 bg-white shadow-md">
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
      </section>
    </div>
  );
}
