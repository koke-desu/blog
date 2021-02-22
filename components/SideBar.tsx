// サイドバーのコンポーネント
// プロフィール、カテゴリーとかを設置。

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div>
      <section className="">
        <Link href="">
          <div>
            <h2>プロフィール</h2>
            <Image src="/images/profile.png" width="100" height="100" />
            <p>webフロントエンドを勉強中の人。</p>
          </div>
        </Link>
      </section>
      <section className="">
        <Link href="">
          <div>
            <h2>カテゴリー</h2>
          </div>
        </Link>
      </section>
      <section className="">
        <Link href="">
          <div>
            <h2>タグ</h2>
          </div>
        </Link>
      </section>
      <section className="">
        <Link href="">
          <div>
            <h2>このブログについて</h2>
            <p>
              Next.jsとFirebaseを使って自作したブログです。管理者の技術力の向上とともにブログも改良していくつもりです。
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}
