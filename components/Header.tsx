import Link from "next/link";

export default function Header() {
  return (
    <div className="">
      <h1 className="text-5xl flex justify-center p-2">
        <Link href="">技術ブログ的なやつ</Link>
      </h1>
      <h2 className="text-xl flex justify-center p-2">
        主にフロントエンド関係で学んだことを書いていきます。
      </h2>
      <nav className="flex justify-center">
        <p className="p-4">
          <Link href="">ホーム</Link>
        </p>
        <p className="p-4">
          <Link href="">自己紹介</Link>
        </p>
        <p className="p-4">
          <Link href="">ブログの歴史</Link>
        </p>
        <p className="p-4">
          <Link href="">カテゴリー・タグ</Link>
        </p>
      </nav>
    </div>
  );
}
